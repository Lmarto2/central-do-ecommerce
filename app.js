require('dotenv').config(); // Carregar as variáveis de ambiente do arquivo .env

const express = require('express');
const axios = require('axios');
const app = express();

// Definir as variáveis da Nuvemshop
const APP_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Rota raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo à Central do E-commerce!'); // Mensagem para indicar que o servidor está funcionando
});

// Rota de autenticação (inicia o processo de OAuth)
app.get('/auth', (req, res) => {
  const authUrl = `https://www.nuvemshop.com.br/admin/oauth/authorize?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=read_orders&response_type=code`;
  res.redirect(authUrl);
});

// Verifica a rota de callback (autenticação)
app.get('/auth/callback', async (req, res) => {
  const code = req.query.code; // Código retornado na URL de callback

  try {
    // Fazer a troca do código por um token de acesso
    const response = await axios.post('https://api.nuvemshop.com.br/v1/oauth/token', {
      client_id: APP_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
    });

    const accessToken = response.data.access_token; // Armazenar o access token

    // Exibir o token de acesso
    res.send(`Token de acesso: ${accessToken}`);
  } catch (error) {
    console.error('Erro ao obter token:', error);
    res.status(500).send('Erro ao obter o token de acesso.');
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
