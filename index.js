const venom = require('venom-bot');


venom
  .create({
    session: 'w3c-bot',
    headless: true,
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log('Erro ao iniciar o Venom:', erro);
  });
function start(client) {
  const numero = '5581983191149'; // Sem o @c.us aqui
  const mensagem = 'Olá! Esta mensagem foi enviada automaticamente com Venom';

  client
    .sendText(`${numero}@c.us`, mensagem)
    .then((result) => {
      console.log('Mensagem enviada com sucesso!', result);
    })
    .catch((error) => {
      console.error('Erro ao enviar mensagem:', error);
    });
}
