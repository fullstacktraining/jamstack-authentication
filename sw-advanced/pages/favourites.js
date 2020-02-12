import React from 'react'
import Layout from '../components/Layout'
import api from '../lib/api'
import { useFetchUser } from '../lib/user';
import Link from '../components/Link';

const Favourites = () => {
  const { response, error, isLoading} = api('/api/favourites');
  const { user, loading} = useFetchUser();
  return (
    <Layout user={user}>
      <h1>Favourite Characters</h1>
      {(!isLoading && user && response && response.characters.length !== 0) ? (
        response.characters.map(favourite => (
          <li key={favourite._id}>
            <Link href='/characters/[id]' as={`/characters/${favourite._id}`}>
              <a>
                {favourite.name}
              </a>
            </Link>
          </li>
        ))
      ) : (
        <p>No favourites yet</p>
      )}
    </Layout>
  )
}

export default Favourites
