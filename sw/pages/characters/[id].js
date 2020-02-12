import React from 'react'
import Layout from '../../components/Layout'
import CharacterCard from '../../components/CharacterCard';
import fetch from 'isomorphic-unfetch';
import { useFetchUser } from '../../lib/user';

const Character = props => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user}>
      <CharacterCard name={props.name} weapon={props.weapon} bio={props.bio} image={props.image} homeworld={props.homeworld} />
    </Layout>
  )
}

Character.getInitialProps = async ({ query }) => {
  const id = parseInt(query.id);
  const response = await fetch(`${process.env.API_BASE_URL}/api/characters/${id}`);
  const data = await response.json();
  return data[0];
}

export default Character