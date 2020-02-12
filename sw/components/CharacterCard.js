import React from 'react';
import { Image } from 'cloudinary-react'; // npm i cloudinary-react

const CharacterCard = ({ name, bio, weapon, homeworld, image }) => (
  <>
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{bio}</p>
        <p className="card-text">{name} is from {homeworld} and uses {weapon} to fight.</p>
      </div>
      <Image cloudName={process.env.CLD_CLOUD_NAME} publicId={`jam/${image}`} width="300" crop="scale" secure="true" />
    </div>
  </>
);

export default CharacterCard;