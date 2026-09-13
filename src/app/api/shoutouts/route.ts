import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

// In Vercel serverless functions, process.cwd() is read-only.
// Use /tmp or in-memory storage to prevent runtime crashes.
const isServerless = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const DATA_DIR = isServerless ? path.join("/tmp", "divine-data") : path.join(process.cwd(), "data");
const SHOUTOUTS_FILE = path.join(DATA_DIR, "shoutouts.json");

// In-memory fallback in case filesystem is restricted
let memoryShoutouts: Shoutout[] = [];

interface Shoutout {
  id: string;
  message: string;
  name: string;
  timestamp: string;
  read: boolean;
}

function readShoutouts(): Shoutout[] {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    if (!existsSync(SHOUTOUTS_FILE)) return memoryShoutouts;
    const content = readFileSync(SHOUTOUTS_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return memoryShoutouts;
  }
}

function writeShoutouts(data: Shoutout[]) {
  memoryShoutouts = data;
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(SHOUTOUTS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Graceful fallback to memory storage on read-only environments
  }
}

// POST /api/shoutouts — submit a shoutout from a listener
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, name } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Strip dangerous tags to prevent stored XSS attacks
    const sanitizedMsg = message.replace(/[<>]/g, "").trim().slice(0, 500);
    const sanitizedName = (name || "Anonymous").replace(/[<>]/g, "").trim().slice(0, 50);

    const shoutout: Shoutout = {
      id: `shout_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      message: sanitizedMsg,
      name: sanitizedName,
      timestamp: new Date().toISOString(),
      read: false,
    };

    const existing = readShoutouts();
    // Keep max 500 shoutouts
    const updated = [shoutout, ...existing].slice(0, 500);
    writeShoutouts(updated);

    return NextResponse.json({ success: true, id: shoutout.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save shoutout" }, { status: 500 });
  }
}

// GET /api/shoutouts — list shoutouts (for DJ/Admin portals)
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);
  const unreadOnly = searchParams.get("unread") === "true";

  const shoutouts = readShoutouts();
  const filtered = unreadOnly ? shoutouts.filter((s) => !s.read) : shoutouts;

  return NextResponse.json({
    count: filtered.length,
    shoutouts: filtered.slice(0, limit),
  });
}

// PATCH /api/shoutouts — mark shoutouts as read
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids } = body;

    if (!Array.isArray(ids)) {
      return NextResponse.json({ error: "ids must be an array" }, { status: 400 });
    }

    const shoutouts = readShoutouts();
    const updated = shoutouts.map((s) =>
      ids.includes(s.id) ? { ...s, read: true } : s
    );
    writeShoutouts(updated);

    return NextResponse.json({ success: true, marked: ids.length });
  } catch {
    return NextResponse.json({ error: "Failed to update shoutouts" }, { status: 500 });
  }
}
