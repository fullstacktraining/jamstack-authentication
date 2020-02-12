import characters from '../../../data/characters'

export default (req, res) => {
  return res.status(200).json(characters);
}