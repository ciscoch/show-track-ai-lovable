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
        "Content-Type": "application/json"  // ✅ CRITICAL
      },
      body: JSON.stringify(payload)         // ✅ CRITICAL
    });

    const data = await response.json();
    console.log("Webhook result:", data);
    alert("Webhook triggered successfully!");
  } catch (error) {
    console.error("Webhook error:", error);
    alert("Webhook test failed — check console.");
  }
};
