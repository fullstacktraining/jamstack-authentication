import React from 'react'
import Link from '../../components/Link'
import Layout from '../../components/Layout'
import { useFetchUser } from '../../lib/user';

const Characters = ({ characters }) => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user}>
      <h1>Character List</h1>
      <ul>
        {characters.map(character => (
          <li key={character._id}>
            <Link href='/characters/[id]' as={`/characters/${character._id}`}>
              <a>{character.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

Characters.getInitialProps = async() => {
  const response = await fetch(`${process.env.API_BASE_URL}/characters`);
  const characters = await response.json();
  return { characters };
}

export default Characters
