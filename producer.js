const { kafka } = require("./client");
const readline = require("readline");

// CLI Application
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  console.log("Connecting Producer...");

  await producer.connect();
  console.log("Connected Producer...");

  rl.setPrompt(">");
  rl.prompt();

  rl.on("line", async (line) => {
    const [riderName, location] = line.split(" ");
    const partition = location.toLowerCase() === "north" ? 0 : 1;

    // Produce Messages
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition,
          key: "location-update",
          value: JSON.stringify({
            name: riderName,
            location,
          }),
        },
      ],
    });

    console.log("Message Send");
  }).on("close", async () => {
    console.log("Disconnecting Producer...");
    await producer.disconnect();
  });
}

init();
