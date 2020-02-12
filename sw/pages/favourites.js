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
      <ul>
        {!isLoading && response && response.map((favourite, i) => (
          <li key={i}><Link href='/characters/[id]' as={`/characters/${favourite.$loki}`}><a>{favourite.name}</a></Link></li>
        ))}
      </ul>
      {!isLoading && error && (
        <div className="alert alert-danger" role="alert">{error.error}</div>
      )}
    </Layout>
  )
}

export default Favourites
