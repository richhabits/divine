// ─── Channel sub-brands ─────────────────────────────────────────────
export type Channel = "DIVINE:ONE" | "DIVINE:SUB" | "DIVINE:CHILL" | "DIVINE:TV";

// ─── Days of the week ───────────────────────────────────────────────
export type DayOfWeek = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

// ─── Channel Metadata ──────────────────────────────────────────────
export interface ChannelMeta {
  id: Channel;
  name: string;
  tagline: string;
  frequency: string;
  genre: string;
  streamUrl: string;
  heroImage: string;
  description: string;
}

// ─── DJ schedule slot ──────────────────────────────────────────────
export interface DJSlot {
  id: string;
  dj: string;
  showName: string;
  genre: string;
  day: DayOfWeek;
  startTime: string; // "18:00"
  endTime: string; // "20:00"
  channel: Channel;
  avatarUrl: string;
  isLive?: boolean;
  bio?: string;
  mixcloudUrl?: string;
}

// ─── Now-playing metadata ──────────────────────────────────────────
export interface NowPlaying {
  dj: string;
  show: string;
  channel: Channel;
  isLive: boolean;
  avatarUrl: string;
  streamUrl: string;
}

// ─── Resident DJ Profile ───────────────────────────────────────────
export interface Resident {
  id: string;
  name: string;
  showName: string;
  genres: string[];
  avatarUrl: string;
  slot: string;
  day: string;
  channel: Channel;
  bio: string;
  mixcloudUrl: string;
  badge?: string;
}

// ─── Event / Club Night ────────────────────────────────────────────
export interface EventItem {
  id: string;
  title: string;
  venue: string;
  location: string;
  date: string;
  doors: string;
  price: string;
  lineup: string[];
  ticketUrl: string;
  category: "CLUB NIGHT" | "FESTIVAL" | "WAREHOUSE" | "ROOFTOP";
  isSoldOut?: boolean;
}

// ─── Merch Item ────────────────────────────────────────────────────
export interface MerchItem {
  id: string;
  name: string;
  price: number;
  category: "HOODIES" | "TEES" | "ACCESSORIES" | "DJ GEAR";
  description: string;
  tag?: string;
  colors?: string[];
  imageUrl?: string;
}

// ─── Archive / Listen Back Show ────────────────────────────────────
export interface ArchiveShow {
  id: string;
  title: string;
  dj: string;
  genre: string;
  date: string;
  duration: string;
  channel: Channel;
  avatarUrl: string;
  mixcloudUrl: string;
  listenCount: number;
}

