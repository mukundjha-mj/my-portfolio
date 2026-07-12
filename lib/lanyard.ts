/**
 * Types + Tier-1 recognition for Lanyard (https://api.lanyard.rest), which
 * mirrors a Discord user's live Rich Presence — used to power the navbar's
 * "live" pill. Only activities with a genuine, zero-glue Discord Rich
 * Presence integration are recognized here (VS Code, JetBrains IDEs,
 * Spotify, Apple Music, Twitch, Steam games); anything else (e.g. a manual
 * custom status) is ignored so the pill stays a clean signal.
 */

import { createElement, type ComponentType } from "react";
import {
  SiSpotify,
  SiApplemusic,
  SiSteam,
  SiTwitch,
  SiIntellijidea,
  SiWebstorm,
  SiPycharm,
} from "react-icons/si";

export type IconComponent = ComponentType<{ className?: string }>;

// Simple Icons dropped the VS Code mark (Microsoft trademark request), so
// there's no `SiVisualstudiocode` export to pull from react-icons — source
// the real logo from devicon instead, the standard place dev-tool logos
// like this live.
const VsCodeIcon: IconComponent = ({ className }) =>
  createElement("img", {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    alt: "",
    className,
  });

export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

type Timestamps = { start?: number; end?: number };

// Discord activity types: 0 Playing, 1 Streaming, 2 Listening, 3 Watching, 4 Custom, 5 Competing.
export type LanyardActivity = {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  application_id?: string;
  timestamps?: Timestamps;
};

export type LanyardSpotify = {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps?: Timestamps;
};

export type LanyardPresence = {
  discord_status: DiscordStatus;
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
};

type MatchedActivity = {
  icon: IconComponent;
  appName: string;
  detail: string;
  startedAt?: number;
};

export type PrimaryActivity = MatchedActivity & {
  // Other Tier-1 activities running at the same time, lower priority than
  // the primary one — surfaced in the hover tooltip rather than the pill
  // itself, so multitasking doesn't clutter the navbar.
  also: Pick<MatchedActivity, "icon" | "appName">[];
};

// App names as reported by their Discord Rich Presence integrations.
const CODE_EDITOR_NAMES = ["Visual Studio Code", "VSCode"];
const JETBRAINS_ICONS: Record<string, IconComponent> = {
  "IntelliJ IDEA": SiIntellijidea,
  WebStorm: SiWebstorm,
  PyCharm: SiPycharm,
};

function matchCoding(activities: LanyardActivity[]): MatchedActivity | null {
  const coding = activities.find(
    (a) =>
      a.type === 0 &&
      (CODE_EDITOR_NAMES.includes(a.name) || a.name in JETBRAINS_ICONS),
  );
  if (!coding) return null;
  const isVsCode = CODE_EDITOR_NAMES.includes(coding.name);
  return {
    icon: isVsCode ? VsCodeIcon : JETBRAINS_ICONS[coding.name],
    appName: isVsCode ? "VS Code" : coding.name,
    detail: coding.details ?? coding.state ?? "Coding",
    startedAt: coding.timestamps?.start,
  };
}

function matchListening(presence: LanyardPresence): MatchedActivity | null {
  if (presence.listening_to_spotify && presence.spotify) {
    return {
      icon: SiSpotify,
      appName: "Spotify",
      detail: `${presence.spotify.song} — ${presence.spotify.artist}`,
      startedAt: presence.spotify.timestamps?.start,
    };
  }
  const appleMusic = presence.activities.find(
    (a) => a.type === 2 && a.name === "Apple Music",
  );
  if (appleMusic) {
    return {
      icon: SiApplemusic,
      appName: "Apple Music",
      detail: appleMusic.details ?? "Listening",
      startedAt: appleMusic.timestamps?.start,
    };
  }
  return null;
}

function matchStreaming(activities: LanyardActivity[]): MatchedActivity | null {
  const stream = activities.find((a) => a.type === 1);
  if (!stream) return null;
  return {
    icon: SiTwitch,
    appName: "Twitch",
    detail: stream.details ?? stream.name,
    startedAt: stream.timestamps?.start,
  };
}

function matchGame(activities: LanyardActivity[]): MatchedActivity | null {
  const game = activities.find(
    (a) =>
      a.type === 0 &&
      !CODE_EDITOR_NAMES.includes(a.name) &&
      !(a.name in JETBRAINS_ICONS),
  );
  if (!game) return null;
  return {
    icon: SiSteam,
    appName: game.name,
    detail: game.details ?? game.state ?? "Playing",
    startedAt: game.timestamps?.start,
  };
}

/**
 * Reduce a raw Lanyard presence down to the Tier-1 activity to headline in
 * the pill (highest priority: coding > listening > streaming > game), plus
 * whatever else is running at the same time for the hover tooltip.
 */
export function pickPrimaryActivity(
  presence: LanyardPresence | null,
): PrimaryActivity | null {
  if (!presence) return null;
  const matches = [
    matchCoding(presence.activities),
    matchListening(presence),
    matchStreaming(presence.activities),
    matchGame(presence.activities),
  ].filter((m): m is MatchedActivity => m !== null);

  const [primary, ...rest] = matches;
  if (!primary) return null;
  return {
    ...primary,
    also: rest.map(({ icon, appName }) => ({ icon, appName })),
  };
}

/** "Active for 12m 34s" style duration since a Discord activity's `timestamps.start`. */
export function formatDuration(startedAt: number): string {
  const totalSeconds = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  if (hours >= 24) return `${Math.floor(hours / 24)}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (totalMinutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}
