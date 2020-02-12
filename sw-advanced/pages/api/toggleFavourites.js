import { getIdFromServerCookie } from '../../lib/auth';
import fetch from 'isomorphic-unfetch';

export default async function toggleFavourites(req, res) {
  try {
    const userID = getIdFromServerCookie(req);
    const { id, favourite } = req.body;
    const url = `${process.env.API_BASE_URL}/characters/${id}`;
    const usersArray = await fetch(url);
    let userIDs = (await usersArray.json()).users.map(user => user._id);

    if (favourite) {
      userIDs = userIDs.filter(element => element !== userID);
    } else {
      userIDs = userIDs.concat(userID);
    }
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        users: userIDs
      })
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch(error) {
    console.error(error);
  }
}