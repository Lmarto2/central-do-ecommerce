const express = require('express');
const axios = require('axios');
const router = express.Router();

// Variáveis de ambiente
const APP_ID = process.env.APP_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Rota de callback para obter o token de acesso
router.get('/callback', async (req, res) => {
  const code = req.query.code; // Código retornado na URL de callback

  if (!code) {
    return res.status(400).send('Código de autorização não encontrado.');
  }

  try {
    // Fazer a requisição para obter o token de acesso
    const response = await axios.post('https://api.nuvemshop.com.br/v1/oauth/token', {
      client_id: APP_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
    });

    const accessToken = response.data.access_token; // Armazenar o access_token
    const userId = response.data.user_id; // O ID da loja (se necessário)

    // Exibir o token de acesso ou retornar conforme sua necessidade
    res.send(`Token de acesso: ${accessToken} para a loja ID: ${userId}`);
  } catch (error) {
    console.error('Erro ao obter token:', error.response ? error.response.data : error.message);
    res.status(500).send('Erro ao obter o token de acesso.');
  }
});

module.exports = router;
