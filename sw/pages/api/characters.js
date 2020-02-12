import fetch from 'isomorphic-unfetch';

export default async function characters(req, res) {
  try {
    const url = `${process.env.API_BASE_URL}/api/characters`;
    const response = await fetch(url)
    const characters = await response.json();
    return res.status(200).json(characters);
  } catch (error) {
    return res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
}