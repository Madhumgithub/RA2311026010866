const fetch = require("node-fetch");
const Log = require("../logging-middleware/logger");

const TOKEN = "PASTE_YOUR_TOKEN_HERE";

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1
};

async function getNotifications() {
  try {
    await Log("backend", "info", "service", "Fetching notifications");

    const res = await fetch("http://20.207.122.201/evaluation-service/notifications", {
      headers: {
        "Authorization": `Bearer ${TOKEN}`
      }
    });

    const data = await res.json();

    await Log("backend", "info", "service", "Notifications fetched successfully");

    return data.notifications;

  } catch (error) {
    await Log("backend", "error", "service", "Failed to fetch notifications");
    console.error(error);
  }
}

function calculatePriority(notification) {
  const weight = weights[notification.Type] || 0;
  const time = new Date(notification.Timestamp).getTime();

  return weight * 1000000000000 + time;
}

async function main() {
  const notifications = await getNotifications();

  notifications.forEach(n => {
    n.priority = calculatePriority(n);
  });

  notifications.sort((a, b) => b.priority - a.priority);

  const top10 = notifications.slice(0, 10);

  await Log("backend", "info", "handler", "Top 10 notifications calculated");

  console.log("TOP 10 NOTIFICATIONS:");
  console.log(top10);
}

main();
