const venom = require('venom-bot');

venom
  .create({
    session: 'w3c-bot',
    browserArgs: ['--headless=new']
  })
  .then((client) => start(client))
  .catch((error) => {
    console.error('Erro ao iniciar o Venom:', error);
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
