import type { ServerWebSocket } from "bun";
interface Message {
  type: string;
  content: string;
}

const rooms = new Map();
const docs = new Map();

Bun.serve({
  port: 3002,
  fetch(req, server) {
    const docId = this.url.searchParams.get("docId") || "test";
    const user = this.url.searchParams.get("user") || "anonymous";
    if (server.upgrade(req, { data: { docId, user } })) return;
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    // “Hey TypeScript, I promise that later this object will look like { docId, user }, even though right now it’s just {}.”

    data: {} as { docId: string; user: string },

    open(ws) {
      // get the docId and user
      const { docId, user } = ws.data;
      // ws.send("Hello from server")
      //if that room doesn't exist then create it
      if (!rooms.has(docId)) rooms.set(docId, new Set());
      // get the content from doc based on room
      const room = rooms.get(docId);
      room.add(ws);
      console.log(docs);
      // send the content to that connected guy
      const doc = docs.get(docId);
      console.log(doc, "doc");
      if (doc) ws.send(JSON.stringify({ type: "initial", content: doc }));
    },
    message(ws, message) {
      const { docId, user } = ws.data;
      // converting to string because message is in buffer
      const data = JSON.parse(message.toString());

      const { type, content } = data;
      // console.log(data);
      if (type === "update") {
        docs.set(docId, content);
        broadcast(docId, JSON.stringify(data), ws);
      }
    },
    close(ws, code, reason) {
      // closing remove the ws from room and if room is empty delete it
      const { docId, user } = ws.data;
      const room = rooms.get(docId);

      if (room) {
        room?.delete(ws);
        if (room.size === 0) {
          rooms.delete(docId);
        }
      }
    },
  },
});

const broadcast = (
  docId: string,
  message: string,
  exclude?: ServerWebSocket<{ docId: string; user: string }>
) => {
  const room = rooms.get(docId);
  if (room) {
    for (let client of room) {
      if (client !== exclude) {
        client.send(message);
      }
    }
  }
};
