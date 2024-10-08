import pokedex from "../../assets/pokedex.png";
import styles from "./Pokedex.module.css";
import enter from "../../assets/enterIcon.png";
import back from "../../assets/backIcon.png";
import { useEffect, useState } from "react";

const Pokedex = () => {
  const [preload, setPreload] = useState(false);
  const [search, setSearch] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const [screenState, setScreenState] = useState({ img: "", notFound: false });
  const [loading, setLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handlePreload = async () => {
    setPreload(true);
    setLoadingMessage("Cargando...");
    await preloadData();
    setLoadingMessage("Pokemons cargados con éxito");
  };

  const handleSearch = () => {
    setSearch(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(event.target.value);
  };

  const handleEnterClick = () => {
    if (pokemonName.trim()) {
      console.log("Buscar Pokemon:", pokemonName.trim());
      setLoadingMessage(""); 
      fetchData(pokemonName.trim());
    } else {
      console.log("Por favor ingresa un nombre de Pokémon válido");
    }
  };

  const handleBackClick = () => {
    setSearch(false);
    setPokemonName("");
    setScreenState({ img: "", notFound: false });
  };

  const preloadData = async () => {
    try {
      const response = await fetch("http://localhost:3001/pokemon");
      const data = await response.json();
      setPokemonList(data);
    } catch (error) {
      console.error("Error al cargar la lista de Pokémon:", error);
    }
  };

  const fetchData = async (name: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/pokemon/img/${name}`);
      if (!response.ok) {
        setScreenState({ img: "", notFound: true });
        setLoading(false);
        return;
      }
      const imgUrl = await response.json();
      setScreenState({ img: imgUrl, notFound: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      setScreenState({ img: "", notFound: true });
    }
    setLoading(false);
  };

  return (
    <div className={styles.pokedex}>
      <img src={pokedex} alt="pokedex.png" />

      <div className={styles.screen}>
        {loading ? (
          <p>Cargando...</p>
        ) : screenState.notFound ? (
          <p>No se encontró el Pokémon</p>
        ) : (
          screenState.img && <img src={screenState.img} alt="Pokemon" />
        )}
        {loadingMessage && <p>{loadingMessage}</p>}
      </div>

      <div className={styles.form}>
        {preload ? (
          search ? (
            <input
              type="text"
              placeholder="Nombre del Pokemon"
              value={pokemonName}
              onChange={handleInputChange}
            />
          ) : (
            <button onClick={handleSearch}>Buscar Pokemon</button>
          )
        ) : (
          <button onClick={handlePreload}>Cargar Pokemons</button>
        )}
      </div>

      <div className={styles.numbers}>
        {Array.from({ length: 10 }, (_, i) => (
          <button key={i}>
            <p>{(i + 1) % 10}</p>
          </button>
        ))}
      </div>

      <div className={styles.buttons}>
        <button onClick={handleBackClick}>
          <img src={back} alt="back.png" />
        </button>
        <button onClick={handleEnterClick}>
          <img src={enter} alt="enter.png" />
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
