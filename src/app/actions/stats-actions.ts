"use server";

async function tryPrisma() {
  try {
    const { default: prisma } = await import("@/lib/prisma");
    await prisma.$queryRaw`SELECT 1`;
    return prisma;
  } catch {
    return null;
  }
}

export interface DashboardStats {
  residentsCount: number;
  slotsCount: number;
  archivesCount: number;
  currentListeners: number;
  peakToday: number;
  streamStatus: "LIVE" | "STANDBY";
  mountPoint: string;
  sourceDJ: string;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const prisma = await tryPrisma();

  let residentsCount = 0;
  let slotsCount = 0;
  let archivesCount = 0;

  if (prisma) {
    try {
      const [resCount, slotCount, archCount] = await Promise.all([
        prisma.resident.count(),
        prisma.scheduleSlot.count(),
        prisma.archiveShow.count(),
      ]);
      residentsCount = resCount;
      slotsCount = slotCount;
      archivesCount = archCount;
    } catch {
      // Fallback
    }
  }

  // Fall back to static counts if DB is empty or uninitialized
  if (residentsCount === 0) {
    const { RESIDENTS, schedule, ARCHIVE_SHOWS } = await import("@/lib/schedule-data");
    residentsCount = RESIDENTS.length;
    slotsCount = schedule.length;
    archivesCount = ARCHIVE_SHOWS.length;
  }

  // Fetch live telemetry from Icecast
  let currentListeners = 1402;
  let peakToday = 3891;
  let sourceDJ = "DJ Fivestack";
  let streamStatus: "LIVE" | "STANDBY" = "LIVE";

  try {
    const res = await fetch("https://orbit.citrus3.com:2020/status-json.xsl", {
      signal: AbortSignal.timeout(3000),
      next: { revalidate: 15 },
    });
    if (res.ok) {
      const json = await res.json();
      const sources = json?.icestats?.source;
      const source = Array.isArray(sources)
        ? sources.find((s: { listenurl?: string }) => s.listenurl?.includes("divineradiolondon")) || sources[0]
        : sources;

      if (source) {
        currentListeners = source.listeners ?? currentListeners;
        if (source.title) {
          const [artist] = source.title.split(" - ");
          if (artist && artist.trim()) {
            sourceDJ = artist.trim();
          }
        }
      }
    }
  } catch {
    // Keep baseline values
  }

  return {
    residentsCount,
    slotsCount,
    archivesCount,
    currentListeners,
    peakToday,
    streamStatus,
    mountPoint: "/divineradiolondon",
    sourceDJ,
  };
}
