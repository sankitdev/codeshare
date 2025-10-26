"use client";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "./ui/textarea";

export default function CodeEditor({ docId }: { docId: string }) {
  const [content, setContent] = useState("");
  const [usersCount, setUsersCount] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // this will send request to create websocket
    const ws = new WebSocket(`http://localhost:3002/docId=${docId}&user=ankit`);
    wsRef.current = ws;
    ws.onopen = (event) => {
      console.log(event, "onopen")
    }; // fires once handshake succeeds
    ws.onmessage = (event) => {
      // console.log(event.data);
      const data = JSON.parse(event.data)
      // console.log(data)
      if(data.type === "initial") setContent(data.content)
      if(data.type === "update"){
        setContent(data.content)
      }

    }; // fires whenever a message arrives
    ws.onclose = () => console.log("disconnected ❌"); // fires when connection closes

    return () => ws.close(); // why
  }, [docId]);

  const handleChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      const payload = {
        type: "update",
        content: newContent,
      };
      ws.send(JSON.stringify(payload));
    }
  };

  return (
    <>
      <div className="m-2">{usersCount} Users Count</div>
      <Textarea
        id={docId}
        className="w-full h-full"
        value={content}
        onChange={handleChange}
      />
    </>
  );
}
