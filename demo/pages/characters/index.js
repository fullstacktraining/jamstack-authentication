import React from 'react'
import Layout from '../../components/Layout'
// import characters from '../../data/characters.json'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch';

const Characters = ({ characters }) => (
  <Layout>
    <h1>Character List</h1>
    <p>Our characters:</p>
    <ul>
      {characters.map(character => (
        <li key={character.id}>
          <Link
            href='/characters/[id]'
            as={`/characters/${character.id}`}
          ><a>{character.name}</a></Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Characters.getInitialProps = async () => {
  const response = await fetch('http://localhost:3000/api/characters');
  const characters = await response.json();
  return { characters };
}

export default Characters
