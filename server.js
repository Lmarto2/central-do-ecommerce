const express = require('express');
const axios = require('axios');
const app = express();

const clientId = 'SEU_APP_ID';  // Substitua pelo seu App ID
const clientSecret = 'SEU_CLIENT_SECRET';  // Substitua pelo seu Client Secret
const redirectUri = 'http://localhost:3000/auth/callback';  // URL de redirecionamento configurada no app

app.get('/auth/callback', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).send('Código de autorização não encontrado');
    }

    try {
        // Trocar o código por um token de acesso
        const response = await axios.post('https://api.nuvemshop.com.br/oauth/token', {
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        });

        // O token de acesso estará na resposta
        const accessToken = response.data.access_token;

        // Salve o token de acesso ou utilize-o para fazer requisições à API
        res.send('Aplicativo instalado com sucesso!');
    } catch (error) {
        console.error('Erro ao trocar o código:', error);
        res.status(500).send('Erro ao trocar o código por um token de acesso');
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
