"use server";

import { ArchiveShow } from "@/lib/types";

async function tryPrisma() {
  try {
    const { default: prisma } = await import("@/lib/prisma");
    await prisma.$queryRaw`SELECT 1`;
    return prisma;
  } catch {
    return null;
  }
}

export async function getArchiveShows(): Promise<ArchiveShow[]> {
  const prisma = await tryPrisma();
  
  if (prisma) {
    try {
      const archives = await prisma.archiveShow.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20
      });
      
      if (archives.length > 0) {
        return archives as ArchiveShow[];
      }
    } catch {
      // Fall through to static data
    }
  }
  
  // Fallback: use static archive data
  const { ARCHIVE_SHOWS } = await import("@/lib/schedule-data");
  return ARCHIVE_SHOWS;
}
