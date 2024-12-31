const { kafka } = require("./client");
const groupId = process.argv[2];

async function init() {
  const consumer = kafka.consumer({ groupId });
  console.log("Connecting Consumer...");

  await consumer.connect();
  console.log("Connected Consumer...");

  console.log("Subscribing Topic...");

  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });

  await consumer.run({
    async eachMessage({ topic, partition, message, heartbeat, pause }) {
      console.log(
        `Group: ${groupId} [${topic}]: PART:${partition}: ${JSON.stringify(
          message
        )}`
      );
    },
  });
}

init();
