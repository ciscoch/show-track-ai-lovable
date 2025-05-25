
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const WebhookTester = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [password, setPassword] = useState('YOUR_SECRET_PASSWORD');

  const runWebhookTest = async () => {
    setIsLoading(true);
    setResponse(null);

    const webhookUrl = "https://cwcharles81.app.n8n.cloud/webhook-test/animal-entry-upload";

    const payload = {
      user_email: "test-elite@example.com",
      animal_id: "abc123",
      weight: 135.2,
      photo_url: "https://example.com/photo.jpg",
      journal_text: "Big gains after protein bump"
    };

    const basicAuth = btoa(`lovable:${password}`); // base64 encode

    try {
      console.log("Sending webhook request...", payload);
      
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${basicAuth}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Webhook Response:", data);
      setResponse(data);
      
      toast({
        title: "Webhook Success",
        description: "The webhook was called successfully!",
      });
    } catch (err) {
      console.error("Error:", err);
      setResponse({ error: err.message });
      
      toast({
        title: "Webhook Error",
        description: `Failed to call webhook: ${err.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Webhook Tester</CardTitle>
        <CardDescription>
          Test the n8n webhook with animal entry data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Basic Auth Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the secret password"
          />
        </div>

        <div className="space-y-2">
          <Label>Payload Preview</Label>
          <Textarea
            readOnly
            value={JSON.stringify({
              user_email: "test-elite@example.com",
              animal_id: "abc123",
              weight: 135.2,
              photo_url: "https://example.com/photo.jpg",
              journal_text: "Big gains after protein bump"
            }, null, 2)}
            rows={8}
          />
        </div>

        <Button 
          onClick={runWebhookTest} 
          disabled={isLoading || !password}
          className="w-full"
        >
          {isLoading ? "Sending..." : "Send Webhook"}
        </Button>

        {response && (
          <div className="space-y-2">
            <Label>Response</Label>
            <Textarea
              readOnly
              value={JSON.stringify(response, null, 2)}
              rows={6}
              className="font-mono text-sm"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WebhookTester;
