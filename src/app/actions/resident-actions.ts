"use server";

import { Resident } from "@/lib/types";

// Try database first, fall back to static data
async function tryPrisma() {
  try {
    const { default: prisma } = await import("@/lib/prisma");
    // Quick test to see if DB is accessible
    await prisma.$queryRaw`SELECT 1`;
    return prisma;
  } catch {
    return null;
  }
}

export async function getResidents(): Promise<Resident[]> {
  const prisma = await tryPrisma();
  
  if (prisma) {
    try {
      const residents = await prisma.resident.findMany({
        orderBy: { name: 'asc' }
      });
      
      if (residents.length > 0) {
        return residents.map(r => ({
          id: r.id,
          name: r.name,
          showName: r.showName,
          genres: JSON.parse(r.genres) as string[],
          avatarUrl: r.avatarUrl,
          bio: r.bio,
          mixcloudUrl: r.mixcloudUrl || "",
          slot: "TBA",
          day: "TBA",
          channel: "DIVINE:ONE" as const
        })) as Resident[];
      }
    } catch {
      // Fall through to static data
    }
  }
  
  // Fallback: use the static data
  const { RESIDENTS } = await import("@/lib/schedule-data");
  return RESIDENTS;
}

export async function getResidentById(id: string): Promise<Resident | null> {
  const prisma = await tryPrisma();
  
  if (prisma) {
    try {
      const r = await prisma.resident.findUnique({ where: { id } });
      if (r) {
        return {
          id: r.id,
          name: r.name,
          showName: r.showName,
          genres: JSON.parse(r.genres) as string[],
          avatarUrl: r.avatarUrl,
          bio: r.bio,
          mixcloudUrl: r.mixcloudUrl || "",
          slot: "TBA",
          day: "TBA",
          channel: "DIVINE:ONE" as const
        } as Resident;
      }
    } catch {
      // Fall through
    }
  }
  
  const { RESIDENTS } = await import("@/lib/schedule-data");
  return RESIDENTS.find(r => r.id === id) || null;
}

export async function createResident(data: Omit<Resident, "id" | "slot" | "day" | "channel">) {
  const { getServerSession } = await import("next-auth");
  const { authOptions } = await import("@/lib/auth");
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized: Admin session required." };
  }

  const prisma = await tryPrisma();
  if (!prisma) return { success: false, error: "Database not available" };

  const { revalidatePath } = await import("next/cache");
  const id = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  await prisma.resident.create({
    data: {
      id,
      name: data.name,
      showName: data.showName,
      genres: JSON.stringify(data.genres),
      avatarUrl: data.avatarUrl,
      bio: data.bio,
      mixcloudUrl: data.mixcloudUrl
    }
  });
  
  revalidatePath("/");
  revalidatePath("/residents");
  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteResident(id: string) {
  const { getServerSession } = await import("next-auth");
  const { authOptions } = await import("@/lib/auth");
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized: Admin session required." };
  }

  const prisma = await tryPrisma();
  if (!prisma) return { success: false, error: "Database not available" };

  const { revalidatePath } = await import("next/cache");
  
  await prisma.resident.delete({ where: { id } });
  
  revalidatePath("/");
  revalidatePath("/residents");
  revalidatePath("/admin/users");
  return { success: true };
}

export async function updateResident(id: string, data: Omit<Resident, "id" | "slot" | "day" | "channel">) {
  const { getServerSession } = await import("next-auth");
  const { authOptions } = await import("@/lib/auth");
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized: Admin session required." };
  }

  const prisma = await tryPrisma();
  if (!prisma) return { success: false, error: "Database not available" };

  const { revalidatePath } = await import("next/cache");
  
  await prisma.resident.update({
    where: { id },
    data: {
      name: data.name,
      showName: data.showName,
      genres: JSON.stringify(data.genres),
      avatarUrl: data.avatarUrl,
      bio: data.bio,
      mixcloudUrl: data.mixcloudUrl
    }
  });
  
  revalidatePath("/");
  revalidatePath("/residents");
  revalidatePath("/admin/users");
  return { success: true };
}
