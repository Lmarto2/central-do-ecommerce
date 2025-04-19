require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env
const express = require('express');
const axios = require('axios');
const app = express();

// Variáveis da Nuvemshop
const APP_ID = process.env.APP_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à Central do E-commerce!');
});

// Rota de callback (autenticação)
app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post('https://api.nuvemshop.com.br/v1/oauth/token', {
      client_id: APP_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
    });

    const accessToken = response.data.access_token;
    res.send(`Token de acesso: ${accessToken}`);
  } catch (error) {
    console.error('Erro ao obter token:', error);
    res.status(500).send('Erro ao obter o token de acesso.');
  }
});

// Webhook para apagar dados de loja (LGPD)
app.post('/webhook/store-redact', (req, res) => {
  console.log('Dados da loja apagados.');
  res.status(200).send('Dados da loja apagados.');
});

// Webhook para apagar dados de clientes (LGPD)
app.post('/webhook/customers-redact', (req, res) => {
  console.log('Dados de cliente apagados.');
  res.status(200).send('Dados de cliente apagados.');
});

// Webhook para fornecer dados de clientes (LGPD)
app.post('/webhook/customers-data-request', (req, res) => {
  console.log('Dados de cliente solicitados.');
  res.status(200).send('Dados de cliente fornecidos.');
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
