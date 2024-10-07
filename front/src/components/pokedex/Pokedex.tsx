import pokedex from "../../assets/pokedex.png";
import styles from "./Pokedex.module.css";
import charizard1  from "../../assets/charizard1.png";


const Pokedex = () => {
  return (
    <div className={styles.pokedex}>
      <img src={pokedex} alt="pokedex.png" /> 

      <div className={styles.screen}>
        <img src={charizard1} alt="charizard1.png" />
      </div>
    </div>
  );
};

export default Pokedex;
