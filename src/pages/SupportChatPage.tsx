
import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { useAppContext } from "@/contexts/AppContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

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
  const [apiKeyAvailable, setApiKeyAvailable] = useState(true);
  const { toast } = useToast();
  const { user } = useAppContext();

  // Check if API key is available on component mount
  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      setApiKeyAvailable(false);
      toast({
        title: "API Key Missing",
        description: "OpenAI API key is not configured. Please add it to your environment variables.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // If API key is not available, show a mock response
    if (!apiKeyAvailable) {
      setTimeout(() => {
        const mockResponse: Message = {
          role: "assistant",
          content: "I'm sorry, but the chat service is currently unavailable. Please check back later or contact support for assistance."
        };
        setMessages(prev => [...prev, mockResponse]);
        setLoading(false);
      }, 1000);
      return;
    }

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
      
      // Check for API errors
      if (data.error) {
        throw new Error(data.error.message || "Error communicating with OpenAI");
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices?.[0]?.message?.content?.trim() ||
          "Sorry, I couldn't generate a response.",
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      let errorMessage = "An error occurred. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          errorMessage = "Invalid API key. Please check your OpenAI API key configuration.";
          setApiKeyAvailable(false);
        }
      }
      
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: errorMessage },
      ]);
      
      toast({
        title: "Chat Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout title="Help Chat" showBackButton user={user}>
      <div className="space-y-4">
        <div className="border rounded-md p-4 h-[60vh] overflow-y-auto space-y-2">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Ask a question about using ShowTrack AI</p>
            </div>
          )}
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
        {!apiKeyAvailable && (
          <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-200">
            <strong>Note:</strong> The OpenAI API key is not configured. For this feature to work, you need to add your 
            API key to the environment variables. Create a <code>.env</code> file in the project root with 
            <code>VITE_OPENAI_API_KEY=your_api_key_here</code>.
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SupportChatPage;
