const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: "kafka-app", // want we want to name our Broker
  brokers: ["localhost:9092"], //The service run on PORT:9092 as whole called broker (can be multiple)
});
