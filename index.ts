const rooms = new Map();

Bun.serve({
  port: 3000,

  fetch(req, server) {
    const url = new URL(req.url);
    const docId = url.searchParams.get("docId") || "default";
    const user = url.searchParams.get("user") || "Anonymous";

    const success = server.upgrade(req, { data: { docId, user } }); // connected with websocket

    if (success) return;

    return new Response("Websocket upgrade failed", { status: 400 });
  },
  // websocket lifecycle handler
  websocket: {
    data: {} as { docId: string; user: string },

    open(ws) {
      const { docId, user } = ws.data;

      if (!rooms.has(docId)) rooms.set(docId, new Set());

      rooms.get(docId).add(ws);
      console.log(`✅ ${user} joined room: ${docId}`);

      // Notify everyone in the room (including sender)
      broadcast(docId, `📢 ${user} joined the room`);
    },
    message: (ws, message) => {
      const { docId, user } = ws.data;
      console.log(`💬 [${docId}] ${user}: ${message}`);

      // Re-broadcast the message to everyone else in that room
      broadcast(docId, `${user}: ${message}`, ws);
    },

    close(ws) {
      const { docId, user } = ws.data;
      const room = rooms.get(docId);
      if (room) {
        room.delete(ws);
        if (room.size === 0) rooms.delete(docId);
      }
      broadcast(docId, `❌ ${user} left the room`);
      console.log(`❌ ${user} disconnected from ${docId}`);
    },
  },
});

function broadcast(docId: string, msg: string, exclude?: any) {
  const room = rooms.get(docId);
  if (!room) return;

  for (const client of room) {
    if (client !== exclude) client.send(msg);
  }
}

console.log("🚀 Server running on ws://localhost:3000");
