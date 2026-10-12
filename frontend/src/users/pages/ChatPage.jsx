import React, { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const enquiryNumber = "+91 98765 43210";

  const getBotReply = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes("room") || text.includes("available")) {
      return "Rooms are available in Munnar, Kochi and Alleppey.";
    }

    if (text.includes("price") || text.includes("rate")) {
      return "Packages start from ₹8,500 per person.";
    }

    if (text.includes("booking")) {
      return "Please share your travel dates and destination.";
    }

    if (text.includes("contact") || text.includes("phone") || text.includes("call")) {
      return `📞 You can contact us directly at ${enquiryNumber}`;
    }

    return "I can help with booking, pricing and availability.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { sender: "user", text: input },
      { sender: "bot", text: getBotReply(input) }
    ]);

    setInput("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
      <h2>💬 Travel Enquiry Chat</h2>

      {/* Enquiry Contact */}
      <div style={{ marginBottom: 10, fontWeight: "bold" }}>
        📞 Enquiry: <a href="tel:+919876543210">+91 98765 43210</a>
      </div>

      <div style={{ border: "1px solid #ccc", padding: 15, height: 400, overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "10px 0"
            }}
          >
            <span
              style={{
                background: msg.sender === "user" ? "#000" : "#eee",
                color: msg.sender === "user" ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: 10,
                display: "inline-block"
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={sendMessage} style={{ padding: "10px 20px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
