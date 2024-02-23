import { FC } from "react";
import pokeball from '../assets/pokeball.png'

const Preview: FC<{ name: string; onClick: () => void }> = ({ name, onClick }) => {
  return (
    <div
      className="card-item"
      onClick={onClick}
    >
      <img src={pokeball} alt="pokeball" width={80}/>
      <p style={{ textAlign: 'center'}}>{name}</p>
    </div>
  );
};

export default Preview;
