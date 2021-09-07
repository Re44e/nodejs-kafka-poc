import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = express.Router();

routes.post('/health', async (req, res) => {
  const message = {
    service: { id: 1, name: 'health-notification' },
    status: 'ok'
  };

  await req.producer.send({
    topic: 'health-notification',
    compression: CompressionTypes.GZIP,
    messages: [
      { value: JSON.stringify(message) }
    ],
  });
  return res.json({ ok: true });
});

export default routes;