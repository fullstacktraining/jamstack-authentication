import React, { useState } from 'react';
import { Image } from 'cloudinary-react'; // npm i cloudinary-react
import { useUser } from '../lib/user';

const CharacterCard = ({ id, name, bio, weapon, homeworld, image, favourite }) => {
  const [fav, setFavourite] = useState(favourite);
  const { user, loading } = useUser();
  const toggle = async() => {
    try {
      const response = await fetch('/api/toggleFavourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          favourite
        })
      })
      const data = await response.json();
      setFavourite(!favourite);
    } catch(error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>

          {user && (fav ?
          (<button className="btn btn-danger my-2 my-sm-0" onClick={toggle}>Remove from Favourites</button>)
          :
          (<button className="btn btn-success my-2 my-sm-0" onClick={toggle}>Add to Favourites</button>))}

          <p className="card-text">{bio}</p>
          <p className="card-text">{name} is from {homeworld} and uses {weapon} to fight.</p>
        </div>
        <Image cloudName={process.env.CLD_CLOUD_NAME} publicId={`jam/${image}`} width="300" crop="scale" secure="true" />
      </div>
    </>
  );
}

export default CharacterCard;