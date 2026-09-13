"use server";

import { MerchItem } from "@/lib/types";

async function tryPrisma() {
  try {
    const { default: prisma } = await import("@/lib/prisma");
    await prisma.$queryRaw`SELECT 1`;
    return prisma;
  } catch {
    return null;
  }
}

export async function getMerchItems(): Promise<MerchItem[]> {
  const prisma = await tryPrisma();

  if (prisma) {
    try {
      const items = await prisma.merchItem.findMany();
      if (items.length > 0) {
        return items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category as MerchItem["category"],
          description: item.description,
          tag: item.tag || undefined,
        }));
      }
    } catch {
      // Fall through to static
    }
  }

  const { MERCH } = await import("@/lib/schedule-data");
  return MERCH;
}
