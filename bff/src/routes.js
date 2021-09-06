import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = express.Router();

routes.post('/cvc', async (req, res) => {
  const message = {
    service: { id: 1, name: 'cvc-health' },
    health: 'ok'
  };

  await req.producer.send({
    topic: 'health-notification',
    compression: CompressionTypes.GZIP,
    messages: [
      { value: JSON.stringify(message) }
    ],
  });

  await req.producer.disconnect();
  return res.json({ ok: true });
});

export default routes;