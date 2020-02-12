import React from 'react'
import Layout from '../../components/Layout'
import CharacterCard from '../../components/CharacterCard';
import fetch from 'isomorphic-unfetch';
import { useFetchUser } from '../../lib/user';
import { getTokenFromLocalCookie, getTokenFromServerCookie } from '../../lib/auth';
import jwtDecode from 'jwt-decode';

const Character = props => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user}>
      <CharacterCard id={props.id} name={props.name} weapon={props.weapon} bio={props.bio} image={props.image} homeworld={props.homeworld} favourite={props.contains} />
    </Layout>
  )
}

Character.getInitialProps = async ({ req, query }) => {
  const { id } = query;
  const response = await fetch(`${process.env.API_BASE_URL}/characters/${id}`);
  const accessToken = process.browser ? getTokenFromLocalCookie() : getTokenFromServerCookie(req);
  if (accessToken) {
    const data = await response.json();
    const usersFavouritedCharacter = data.users.map(user => user._id);
    const { id: userID } = jwtDecode(accessToken);
    const contains = usersFavouritedCharacter.includes(userID);
    data.contains = contains;
    return data;
  } else {
    const data = await response.json();
    return data;
  }
}

export default Character