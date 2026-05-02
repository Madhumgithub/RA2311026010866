const fetch = require("node-fetch");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtcDkwNzVAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNTc5NCwiaWF0IjoxNzc3NzA0ODk0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYTRjN2Q1ZGQtY2EzNy00YTEyLWI1NmYtNTc0M2QxMzVlYTBhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWFkaHVtaXRhIHAiLCJzdWIiOiI1NWE1NDk0ZC1iMTZjLTQ4NTItYmMyNy1iMjMxNjY5ODQ1MmUifSwiZW1haWwiOiJtcDkwNzVAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJtYWRodW1pdGEgcCIsInJvbGxObyI6InJhMjMxMTAyNjAxMDg2NiIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjU1YTU0OTRkLWIxNmMtNDg1Mi1iYzI3LWIyMzE2Njk4NDUyZSIsImNsaWVudFNlY3JldCI6IkJqQWJwZXNVUWRISHdoRlUifQ.p65xBbShMCoWpuVZq9tQOech_34ZbMUtKfhz97vpWcg";

async function Log(stack, level, packageName, message) {
  try {
    const response = await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: packageName,
        message: message
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Logging failed", error);
  }
}

module.exports = Log;
