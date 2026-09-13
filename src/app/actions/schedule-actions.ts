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

export async function getScheduleSlots() {
  const prisma = await tryPrisma();
  
  if (prisma) {
    try {
      const slots = await prisma.scheduleSlot.findMany({
        include: { resident: true },
        orderBy: [{ day: 'asc' }, { slot: 'asc' }]
      });
      
      if (slots.length > 0) {
        return slots.map(s => ({
          id: s.id,
          dj: s.resident.name,
          showName: s.resident.showName,
          genre: JSON.parse(s.resident.genres).join(' / '),
          day: s.day as import("@/lib/types").DayOfWeek,
          startTime: s.slot.split(' - ')[0] || "00:00",
          endTime: s.slot.split(' - ')[1] || "02:00",
          channel: s.channel as import("@/lib/types").Channel,
          avatarUrl: s.resident.avatarUrl,
          isLive: s.isLive,
          bio: s.resident.bio
        }));
      }
    } catch {
      // Fall through to static data
    }
  }
  
  // Fallback: use static schedule data
  const { schedule: staticSchedule } = await import("@/lib/schedule-data");
  return staticSchedule;
}

export async function createScheduleSlot(data: { day: string, slot: string, channel: string, residentId: string, isLive: boolean }) {
  const { getServerSession } = await import("next-auth");
  const { authOptions } = await import("@/lib/auth");
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized: Admin session required." };
  }

  const prisma = await tryPrisma();
  if (!prisma) return { success: false, error: "Database not available" };

  const { revalidatePath } = await import("next/cache");

  await prisma.scheduleSlot.create({ data });
  
  revalidatePath("/");
  revalidatePath("/admin/schedule");
  return { success: true };
}

export async function deleteScheduleSlot(id: string) {
  const { getServerSession } = await import("next-auth");
  const { authOptions } = await import("@/lib/auth");
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized: Admin session required." };
  }

  const prisma = await tryPrisma();
  if (!prisma) return { success: false, error: "Database not available" };

  const { revalidatePath } = await import("next/cache");

  await prisma.scheduleSlot.delete({ where: { id } });
  
  revalidatePath("/");
  revalidatePath("/admin/schedule");
  return { success: true };
}
