const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtcDkwNzVAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwODY4NiwiaWF0IjoxNzc3NzA3Nzg2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiODkwNWZjY2EtZDQ5MS00MDA5LWI0MTktMDk2M2UxZTMxNTNhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWFkaHVtaXRhIHAiLCJzdWIiOiI1NWE1NDk0ZC1iMTZjLTQ4NTItYmMyNy1iMjMxNjY5ODQ1MmUifSwiZW1haWwiOiJtcDkwNzVAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJtYWRodW1pdGEgcCIsInJvbGxObyI6InJhMjMxMTAyNjAxMDg2NiIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjU1YTU0OTRkLWIxNmMtNDg1Mi1iYzI3LWIyMzE2Njk4NDUyZSIsImNsaWVudFNlY3JldCI6IkJqQWJwZXNVUWRISHdoRlUifQ.n4r7xgW9OlVfdWYjYUtq3Hj5337hppMVwEWPG3yIq14";

// API route
app.get("/notifications", async (req, res) => {
  try {
    const response = await fetch("http://20.207.122.201/evaluation-service/notifications", {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});