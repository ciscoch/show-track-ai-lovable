
import React from "react";

const WebhookTestPage = () => {
  const handleTestWebhook = async () => {
    const payload = {
      name: "Functions"
    };

    try {
      const response = await fetch("https://qmvbsrivanucfpfjchpw.supabase.co/functions/v1/dynamic-worker", {
        method: "POST",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtdmJzcml2YW51Y2ZwZmpjaHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMjgzMjksImV4cCI6MjA2MjkwNDMyOX0.jF7Tkz8pFtx4HHKrWfRRcQPpSeGR4xu8MQvlvV5Vgxo",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log("Webhook result:", data);
      alert("Webhook triggered successfully!");
    } catch (error) {
      console.error("Webhook error:", error);
      alert("Webhook test failed — check console.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Webhook Test Page</h1>
      <p className="mb-4">Click the button below to test the dynamic-worker function.</p>
      <button
        onClick={handleTestWebhook}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Test Dynamic Worker
      </button>
    </div>
  );
};

export default WebhookTestPage;
