const express = require('express');
const bodyParser = require('body-parser');
const venom = require('venom-bot');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let venomClient = null;

venom
  .create({
    session: 'w3c-bot',
    headless: true,
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  .then((client) => {
    venomClient = client;
    console.log('Venom iniciado com sucesso!');
  })
  .catch((erro) => {
    console.log('Erro ao iniciar o Venom:', erro);
  });

app.post('/send', async (req, res) => {
  if (!venomClient) {
    return res.status(503).json({ error: 'Venom não está pronto ainda.' });
  }
  const { numero, mensagem } = req.body;
  if (!numero || !mensagem) {
    return res.status(400).json({ error: 'Número e mensagem são obrigatórios.' });
  }
  try {
    const result = await venomClient.sendText(`${numero}@c.us`, mensagem);
    res.json({ sucesso: true, result });
  } catch (error) {
    res.status(500).json({ sucesso: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
