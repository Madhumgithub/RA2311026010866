const fetch = require("node-fetch");

async function getToken() {
  const res = await fetch("http://20.207.122.201/evaluation-service/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "mp9075@srmist.edu.in",
      name: "madhumita p",
      rollNo: "ra2311026010866",
      accessCode: "QkbpxH",
      clientID: "55a5494d-b16c-4852-bc27-b2316698452e",
      clientSecret: "BjAbpesUQdHHwhFU"
    })
  });

  const data = await res.json();
  console.log("TOKEN:", data);
}

getToken();