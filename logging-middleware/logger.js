const fetch = require("node-fetch");

const TOKEN = "PASTE_YOUR_TOKEN_HERE";

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
