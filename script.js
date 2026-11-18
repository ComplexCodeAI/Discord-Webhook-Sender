async function sendMessage() {
  const webhook = document.getElementById("webhook").value.trim();
  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();
  const embed = document.getElementById("embed").checked;
  const status = document.getElementById("status");

  if (!webhook || !message) {
    status.textContent = "Enter a webhook URL and message.";
    return;
  }

  if (!/^https:\/\/discord\.com\/api\/webhooks\/\d+\/[^/]+$/.test(webhook)) {
    status.textContent = "Invalid Discord webhook URL.";
    return;
  }

  const payload = {
    username: username || "Webhook"
  };

  if (embed) {
    payload.embeds = [{
      title: "a user from Webhook Sender sent ",
      description: message,
      color: 5793266,
      timestamp: new Date().toISOString()
    }];
  } else {
    payload.content = message;
  }

  status.textContent = "⏳ Sending...";

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      status.textContent = "✅ Message sent successfully!";
    } else {
      status.textContent = `❌ Discord error: ${response.status}`;
    }
  } catch (error) {
    status.textContent = "❌ Network error or request blocked.";
  }
}