import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const systemPrompt =
  "You are a helpful assistant for the ShowTrack AI web app. Provide clear instructions about using the app, including signing up and navigating features.";

const SupportChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
            userMessage,
          ],
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices?.[0]?.message?.content?.trim() ||
          "Sorry, I couldn't generate a response.",
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "An error occurred. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout title="Help Chat" showBackButton>
      <div className="space-y-4">
        <div className="border rounded-md p-4 h-[60vh] overflow-y-auto space-y-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={m.role === "user" ? "text-right" : "text-left"}
            >
              <Card className="inline-block max-w-[80%]">
                <CardContent className="p-3 text-sm">
                  {m.content}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask a question..."
          />
          <Button onClick={sendMessage} disabled={loading || !input.trim()}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default SupportChatPage;
