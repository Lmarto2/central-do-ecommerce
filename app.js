require('dotenv').config(); // Carregar as variáveis de ambiente do arquivo .env

const express = require('express');
const axios = require('axios');
const qs = require('qs'); // Adicionado para formatação x-www-form-urlencoded
const app = express();

// Definir as variáveis da Nuvemshop
const APP_ID = process.env.APP_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Middleware para processar o corpo das requisições como JSON
app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo à Central do E-commerce!');
});

// Verifica a rota de callback (autenticação)
app.get('/auth/callback', async (req, res) => {
  const code = req.query.code; // Código retornado na URL de callback

  try {
    // Fazer a troca do código por um token de acesso com headers e corpo corretos
    const response = await axios.post(
      'https://api.nuvemshop.com.br/v1/oauth/token',
      qs.stringify({
        client_id: APP_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = response.data.access_token; // Armazenar o access token

    // Exibir o token de acesso
    res.send(`Token de acesso: ${accessToken}`);
  } catch (error) {
    console.error('Erro ao obter token:', error.response ? error.response.data : error.message);
    res.status(500).send('Erro ao obter o token de acesso.');
  }
});

// Rota para receber o webhook de redação de loja
app.post('/webhook/store/redact', (req, res) => {
  console.log('Store Redact:', req.body);
  res.status(200).send('Webhook de Redação de Loja recebido.');
});

// Rota para receber o webhook de redação de cliente
app.post('/webhook/customers/redact', (req, res) => {
  console.log('Customer Redact:', req.body);
  res.status(200).send('Webhook de Redação de Cliente recebido.');
});

// Rota para receber o webhook de solicitação de dados de cliente
app.post('/webhook/customers/data-request', (req, res) => {
  console.log('Customer Data Request:', req.body);
  res.status(200).send('Webhook de Solicitação de Dados de Cliente recebido.');
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
