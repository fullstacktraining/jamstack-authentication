require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const routes = require('./routes');

const port = process.env.PORT || 4000;

app.use(cors()); // don't do this in production

const errorHandler = ((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ 'error': `${err.name}: ${err.message}` });
  }
});

const auth = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    reateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_API_IDENTIFIER,
  algorithm: ['RS256']
});

app.get('/api/characters', routes.characters);
app.get('/api/characters/:id', routes.character);
app.get('/api/favourites', auth, routes.favourites);

app.listen(port, () => console.log(`🚀 API running on port ${port} `));