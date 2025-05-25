import React from "react";

const WebhookTestPage = () => {
  const handleTestWebhook = async () => {
    const payload = {
      user_email: "test-elite@example.com",
      animal_id: "abc123",
      weight: 135.2,
      photo_url: "https://example.com/photo.jpg",
      journal_text: "Looking fuller and more defined after new feed."
    };

    try {
      const response = await fetch("https://<YOUR-SUPABASE-FUNCTION-URL>.functions.supabase.co/upload-weight", {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_SUPABASE_ANON_KEY", // If required
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
      <p className="mb-4">Click the button below to simulate a user entry.</p>
      <button
        onClick={handleTestWebhook}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Trigger Webhook Test
      </button>
    </div>
  );
};

export default WebhookTestPage;
