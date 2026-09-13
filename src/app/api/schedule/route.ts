import { NextRequest, NextResponse } from "next/server";
import { getScheduleSlots } from "@/app/actions/schedule-actions";
import { DayOfWeek, Channel } from "@/lib/types";

const VALID_DAYS: DayOfWeek[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const VALID_CHANNELS: Channel[] = ["DIVINE:ONE", "DIVINE:SUB", "DIVINE:CHILL", "DIVINE:TV"];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const dayParam = searchParams.get("day")?.toUpperCase() as DayOfWeek | undefined;
  const channelParam = searchParams.get("channel")?.toUpperCase() as Channel | undefined;

  let filtered = await getScheduleSlots();

  // Filter by day
  if (dayParam) {
    if (!VALID_DAYS.includes(dayParam)) {
      return NextResponse.json(
        { error: `Invalid day. Must be one of: ${VALID_DAYS.join(", ")}` },
        { status: 400 }
      );
    }
    filtered = filtered.filter((slot) => slot.day === dayParam);
  }

  // Filter by channel
  if (channelParam) {
    if (!VALID_CHANNELS.includes(channelParam)) {
      return NextResponse.json(
        { error: `Invalid channel. Must be one of: ${VALID_CHANNELS.join(", ")}` },
        { status: 400 }
      );
    }
    filtered = filtered.filter((slot) => slot.channel === channelParam);
  }

  // Sort by day order then start time
  const dayOrder: Record<DayOfWeek, number> = {
    MON: 0, TUE: 1, WED: 2, THU: 3, FRI: 4, SAT: 5, SUN: 6,
  };

  filtered.sort((a, b) => {
    const aOrder = dayOrder[a.day as DayOfWeek] ?? 99;
    const bOrder = dayOrder[b.day as DayOfWeek] ?? 99;
    const dayDiff = aOrder - bOrder;
    if (dayDiff !== 0) return dayDiff;
    return a.startTime.localeCompare(b.startTime);
  });

  return NextResponse.json({
    count: filtered.length,
    schedule: filtered,
  });
}
