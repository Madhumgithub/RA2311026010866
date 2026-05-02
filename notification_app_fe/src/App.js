import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button
} from "@mui/material";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtcDkwNzVAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwODY4NiwiaWF0IjoxNzc3NzA3Nzg2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiODkwNWZjY2EtZDQ5MS00MDA5LWI0MTktMDk2M2UxZTMxNTNhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWFkaHVtaXRhIHAiLCJzdWIiOiI1NWE1NDk0ZC1iMTZjLTQ4NTItYmMyNy1iMjMxNjY5ODQ1MmUifSwiZW1haWwiOiJtcDkwNzVAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJtYWRodW1pdGEgcCIsInJvbGxObyI6InJhMjMxMTAyNjAxMDg2NiIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjU1YTU0OTRkLWIxNmMtNDg1Mi1iYzI3LWIyMzE2Njk4NDUyZSIsImNsaWVudFNlY3JldCI6IkJqQWJwZXNVUWRISHdoRlUifQ.n4r7xgW9OlVfdWYjYUtq3Hj5337hppMVwEWPG3yIq14";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5000/notifications", {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      });

      const data = await res.json();
      console.log("API DATA:", data);

      if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error(error);
      setNotifications([]);
    }
  };

  // Priority Logic
  const weights = {
    Placement: 3,
    Result: 2,
    Event: 1
  };

  const sortedNotifications = [...notifications].sort((a, b) => {
    const pa =
      (weights[a.Type] || 0) * 1000000000000 +
      new Date(a.Timestamp).getTime();

    const pb =
      (weights[b.Type] || 0) * 1000000000000 +
      new Date(b.Timestamp).getTime();

    return pb - pa;
  });

  return (
    <Container>
      <h2>Priority Notifications</h2>

      {/* 🔥 FILTER BUTTONS */}
      <div style={{ marginBottom: "15px" }}>
        <Button variant="contained" onClick={() => setFilter("All")} style={{ marginRight: 5 }}>
          All
        </Button>
        <Button variant="contained" onClick={() => setFilter("Placement")} style={{ marginRight: 5 }}>
          Placement
        </Button>
        <Button variant="contained" onClick={() => setFilter("Event")} style={{ marginRight: 5 }}>
          Event
        </Button>
        <Button variant="contained" onClick={() => setFilter("Result")}>
          Result
        </Button>
      </div>

      {/* NOTIFICATIONS */}
      {(sortedNotifications || [])
        .filter((n) => filter === "All" || n.Type === filter)
        .slice(0, 10)
        .map((n) => {
          const viewed = localStorage.getItem(n.ID);

          return (
            <Card
              key={n.ID}
              style={{
                margin: "10px",
                backgroundColor: viewed ? "#ddd" : "#fff",
                cursor: "pointer"
              }}
              onClick={() => localStorage.setItem(n.ID, "viewed")}
            >
              <CardContent>
                <Typography variant="h6" color="primary">
                  {n.Type}
                </Typography>
                <Typography>{n.Message}</Typography>
                <Typography variant="caption">{n.Timestamp}</Typography>
              </CardContent>
            </Card>
          );
        })}
    </Container>
  );
}

export default App;