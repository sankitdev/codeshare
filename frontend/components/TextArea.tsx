import { Textarea } from "@/components/ui/textarea"

export function CodeEditor() {
  return <div className="w-screen h-screen p-0 m-0">      {/* container filling the viewport */}
      <Textarea
        className="w-full h-full resize-none"
        placeholder="Type your message here..."
        id="message-fullscreen"
      />
    </div>
}

