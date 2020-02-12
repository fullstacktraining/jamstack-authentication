import fetch from 'isomorphic-unfetch';
import auth0 from '../../lib/auth0';

export default async function favourites(req, res) {
  try {
    const tokenCache = auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken({
      scopes: ['read:favourites']
    });
    console.log(process.env.AUTH0_DOMAIN)
    console.log(accessToken);

    const url = `${process.env.API_BASE_URL}/api/favourites`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const characters = await response.json();
    return res.status(200).json(characters);
  } catch(error) {
    return res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
}