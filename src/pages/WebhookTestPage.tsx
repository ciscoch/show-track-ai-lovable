import React from "react";

const WebhookTestPage = () => {
  const handleTestWebhook = async () => {
    const payload = {
      name: "WebhookTest",
      user_email: "test-elite@example.com",
      animal_id: "abc123",
      weight: 135.2,
      photo_url: "https://example.com/photo.jpg",
      journal_text: "Looking fuller and more defined after new feed."
    };

    try {
      const response = await fetch("https://qmvbsrivanucfpfjchpw.functions.supabase.co/dynamic-worker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ 100% required
        },
        body: JSON.stringify(payload),         // ✅ Must stringify the JS object
      });

      const result = await response.json();
      console.log("✅ Webhook Success:", result);
      alert("Webhook triggered successfully!");
    } catch (error) {
      console.error("❌ Webhook Error:", error);
      alert("Webhook test failed — check console.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Webhook Test Page</h1>
      <p className="mb-4">Click the button below to test the Supabase + n8n webhook flow.</p>
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

