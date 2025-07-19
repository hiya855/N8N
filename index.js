const express = require('express');
const { verifyKeyMiddleware } = require('discord-interactions');
const app = express();
const PORT = process.env.PORT || 3000;

const DISCORD_PUBLIC_KEY = process.env.1aa3c8e85ae40a13380eaabf416db8ba260c0e3972b746f5011d8b19ee8468e1;

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

app.post('/api/interactions', verifyKeyMiddleware(DISCORD_PUBLIC_KEY), (req, res) => {
  const { type } = req.body;

  if (type === 1) {
    // Respond to PING
    return res.send({ type: 1 });
  }

  // Handle slash command or other interaction
  return res.send({
    type: 4,
    data: {
      content: 'Hello from Interaction Endpoint!',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
