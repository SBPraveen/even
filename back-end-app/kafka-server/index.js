const { Kafka } = require("kafkajs");

const producerSendMessage = (data, topicName) => {
  try {
    // Create a Kafka instance
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"], // Replace with your Kafka broker addresses
    });
    // Create a producer instance
    const producer = kafka.producer();

    const run = async () => {
      // Connect the producer
      await producer.connect();
      // Send a message to the topic
      await producer.send({
        topic: "test-topic", // Replace with your topic
        messages: [{ value: JSON.stringify(data.msg) }],
      });

      // Disconnect the producer
      await producer.disconnect();
    };

    run().catch(console.error);
  } catch (error) {
    console.error("Error while sending message - web socket server", error);
  }
};

const kafkaReceiveMsg = (homeWindow) => {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"], // Replace with your Kafka broker addresses
  });
  // Create a consumer instance
  const consumer = kafka.consumer({ groupId: "test-group" }); // Replace with your group ID

  const run = async () => {
    // Connect the consumer
    await consumer.connect();

    // Subscribe to the topic
    await consumer.subscribe({ topic: "test-topic", fromBeginning: true }); // Replace with your topic

    // Run the consumer
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
        homeWindow.webContents.send(
          "kafkaReceiveMsg",
          JSON.parse(message.value.toString())
        );
      },
    });
  };

  run().catch(console.error);
};

module.exports = { producerSendMessage, kafkaReceiveMsg };
