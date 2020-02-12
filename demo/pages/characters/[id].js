import React from 'react'
import Layout from '../../components/Layout'
import fetch from 'isomorphic-unfetch';

// import { useRouter } from 'next/router'

// import characters from '../../data/characters.json'

const Character = ({ character }) => {
  // const router = useRouter()
  // const character = characters[router.query.id];
  return (
    <Layout>
      <h1>{character.name}</h1>
      <p>{character.name} is from {character.homeworld}</p>
    </Layout>
  )
}

Character.getInitialProps = async ({ query }) => {
  const { id } = query;
  const response = await fetch(`http://localhost:3000/api/characters/${id}`);
  const character = await response.json();
  return { character }
}

export default Character;