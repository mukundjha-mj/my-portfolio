"use client";

/**
 * Subscribes to a Discord user's live presence via Lanyard's WebSocket
 * (https://github.com/Phineas/lanyard#socket) — no extra dependency, it's
 * a plain JSON-over-WebSocket protocol: Hello (op 1) carries the heartbeat
 * interval, INIT_STATE/PRESENCE_UPDATE (op 0) events carry the presence.
 */

import { useEffect, useState } from "react";
import type { LanyardPresence } from "@/lib/lanyard";

const SOCKET_URL = "wss://api.lanyard.rest/socket";
const RECONNECT_DELAY_MS = 3000;

type LanyardOpcode = 0 | 1 | 2 | 3;

type LanyardMessage = {
  op: LanyardOpcode;
  d?: unknown;
  t?: "INIT_STATE" | "PRESENCE_UPDATE";
};

export function useLanyard(discordId: string): LanyardPresence | null {
  const [presence, setPresence] = useState<LanyardPresence | null>(null);

  useEffect(() => {
    if (!discordId) return;

    let socket: WebSocket | null = null;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const connect = () => {
      if (cancelled) return;
      socket = new WebSocket(SOCKET_URL);

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data) as LanyardMessage;

        if (msg.op === 1) {
          const { heartbeat_interval } = msg.d as { heartbeat_interval: number };
          heartbeat = setInterval(() => {
            socket?.send(JSON.stringify({ op: 3 }));
          }, heartbeat_interval);
          socket?.send(
            JSON.stringify({ op: 2, d: { subscribe_to_ids: [discordId] } }),
          );
          return;
        }

        if (msg.op === 0 && (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE")) {
          const data =
            msg.t === "INIT_STATE"
              ? (msg.d as Record<string, LanyardPresence>)[discordId]
              : (msg.d as LanyardPresence);
          if (data) setPresence(data);
        }
      };

      socket.onclose = () => {
        if (heartbeat) clearInterval(heartbeat);
        if (!cancelled) reconnectTimer = setTimeout(connect, RECONNECT_DELAY_MS);
      };

      socket.onerror = () => socket?.close();
    };

    connect();

    return () => {
      cancelled = true;
      if (heartbeat) clearInterval(heartbeat);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      socket?.close();
    };
  }, [discordId]);

  return presence;
}
