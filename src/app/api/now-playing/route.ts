import { NextResponse } from "next/server";

// Icecast metadata endpoints for Divine Radio London
const ICECAST_BASE = "https://orbit.citrus3.com:2020";
const STREAM_MOUNT = "/stream/divineradiolondon";

interface IcecastSource {
  title?: string;
  server_name?: string;
  listeners?: number;
  listenurl?: string;
  artist?: string;
  song?: string;
}

interface IcecastStatus {
  icestats?: {
    source?: IcecastSource | IcecastSource[];
  };
}

// Cache the response for 15 seconds to avoid hammering the Icecast server
let cache: { data: unknown; ts: number } | null = null;
const CACHE_TTL = 15_000;

export async function GET() {
  // Return cached response if fresh
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return NextResponse.json(cache.data, {
      headers: { "Cache-Control": "public, s-maxage=15" },
    });
  }

  try {
    // Icecast status JSON endpoint
    const res = await fetch(`${ICECAST_BASE}/status-json.xsl`, {
      next: { revalidate: 15 },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) throw new Error(`Icecast returned ${res.status}`);

    const json: IcecastStatus = await res.json();
    const sources = json?.icestats?.source;
    
    // Find our mount point in the sources array
    let source: IcecastSource | undefined;
    if (Array.isArray(sources)) {
      source = sources.find((s) =>
        s.listenurl?.includes("divineradiolondon")
      );
    } else if (sources) {
      source = sources;
    }

    const title = source?.title || source?.song || "";
    // Icecast title format is usually "Artist - Track"
    const [artist, ...trackParts] = title.split(" - ");
    const track = trackParts.join(" - ");

    const payload = {
      isLive: true,
      listeners: source?.listeners ?? 0,
      artist: track ? artist?.trim() : "DIVINE Radio London",
      track: track?.trim() || title?.trim() || "Live Broadcast",
      raw: title,
      streamUrl: `${ICECAST_BASE}${STREAM_MOUNT}`,
    };

    cache = { data: payload, ts: Date.now() };
    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, s-maxage=15" },
    });
  } catch (err) {
    console.error("[now-playing] Icecast fetch failed:", err);

    // Fallback response — station is still live, we just don't have metadata
    const fallback = {
      isLive: true,
      listeners: 0,
      artist: "DIVINE Radio London",
      track: "Live Broadcast",
      raw: "",
      streamUrl: `${ICECAST_BASE}${STREAM_MOUNT}`,
    };

    return NextResponse.json(fallback, {
      headers: { "Cache-Control": "public, s-maxage=15" },
    });
  }
}
