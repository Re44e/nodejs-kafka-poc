import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['localhost:9092'],
  clientId: 'microservice-cvc',
});

const topic = 'health-notification';
const consumer = kafka.consumer({ groupId: 'health-group' });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Health Notification: ${message.value}`);
    },
  })
}

run().catch(console.error);