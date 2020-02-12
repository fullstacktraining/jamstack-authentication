import fetch from 'isomorphic-unfetch';
import { getTokenFromServerCookie, getIdFromServerCookie } from '../../lib/auth';

export default async function favourites(req, res) {
  try {
    const accessToken = getTokenFromServerCookie(req);
    const id = getIdFromServerCookie(req);

    const url = `${process.env.API_BASE_URL}/users/${id}`;
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