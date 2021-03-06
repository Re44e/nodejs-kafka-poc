import express from 'express';
import { Kafka, logLevel } from 'kafkajs';

import routes from '../src/routes';

const app = express();

const kafka = new Kafka({
  clientId: 'bff',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
});

const producer = kafka.producer();

app.use((req, res, next) => {
  req.producer = producer;
  return next();
});

app.use(routes);

async function run() {
  await producer.connect()
  app.listen(3333);
};

run().catch(console.error);