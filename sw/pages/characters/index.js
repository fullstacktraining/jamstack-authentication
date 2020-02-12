import React from 'react'
import Link from '../../components/Link'
import Layout from '../../components/Layout'
import api from '../../lib/api';
import { useFetchUser } from '../../lib/user';

const Characters = () => {
  const { user, loading } = useFetchUser();
  const { response, error, isLoading } = api('/api/characters');
  return (
    <Layout user={user}>
      <h1>Character List</h1>
      <ul>
        {!isLoading && response.map((character, i) => (
          <li key={i}>
            <Link href='/characters/[id]' as={`/characters/${character.$loki}`}>
              <a>{character.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Characters
