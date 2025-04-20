require('dotenv').config();  // Carregar as variáveis de ambiente do .env

// Verifique onde o Node.js está buscando o arquivo .env
console.log("Process.cwd():", process.cwd());  // Mostra o diretório atual

// Exibir as variáveis
console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);
console.log('REDIRECT_URI:', process.env.REDIRECT_URI);
