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

    <div className={styles.form}>
        <p>1. INGRESAR UN POKEMON</p>
        <p>2. SELECCIONAR UN POKEMON</p>
        <p>3. OBTENER INFORMACION</p>
    </div>

    <div className={styles.numbers}>
    {Array.from({ length: 10 }, (_, i) => (
       <button>
            
       <p key={i}>{(i + 1) % 10}</p>
       </button>
    ))}
    </div>

    </div>
  );
};

export default Pokedex;
