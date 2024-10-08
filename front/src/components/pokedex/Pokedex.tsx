import pokedex from "../../assets/pokedex.png";
import enter from "../../assets/enterIcon.png";
import back from "../../assets/backIcon.png";
import { useEffect, useState } from "react";

const Pokedex = () => {
  const [preload, setPreload] = useState(false);
  const [search, setSearch] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const [screenState, setScreenState] = useState({ img: "", notFound: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [register, setRegister] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerType, setRegisterType] = useState("");

  const handlePreload = async () => {
    setPreload(true);
    setLoadingMessage("Cargando...");
    await preloadData();
    setLoadingMessage(""); // Limpiar el mensaje después de cargar
    setScreenState({ img: "", notFound: false, message: "Pokemons cargados con éxito" }); // Mostrar mensaje de éxito
  };

  const handleSearch = () => {
    setSearch(true);
  };

  const handleRegister = () => {
    setRegister(true);
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
    setRegister(false);
    setScreenState({ img: "", notFound: false, message: "" });
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
        setScreenState({ img: "", notFound: true, message: ""    });
        setLoading(false);
        return;
      }
      const imgUrl = await response.json();
      setScreenState({ img: imgUrl, notFound: false, message: ""     });
    } catch (error) {
      console.error("Error fetching data:", error);
      setScreenState({ img: "", notFound: true, message: "" });
    }
    setLoading(false);
  };

  // Función para manejar el cambio de los inputs de registro
  const handleRegisterInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (field === "name") {
      setRegisterName(event.target.value);
    } else if (field === "type") {
      setRegisterType(event.target.value);
    }
  };

  // Función para manejar el registro del Pokémon
  const handleRegisterSubmit = async () => {
    if (registerName.trim() && registerType.trim()) {
      try {
        const response = await fetch("http://localhost:3001/pokemon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: registerName.trim(),
            type: registerType.trim(),
          }),
        });
        if (response.ok) {
          console.log("Pokémon registrado con éxito");
          setRegister(false);
          setRegisterName("");
          setRegisterType("");
          setScreenState({ img: "", notFound: false, message: "Pokemon Registrado" });
        } else {
          setScreenState({ img: "", notFound: false, message: "No se encontro el pokemon" });
          setLoadingMessage(""); // Limpiar el mensaje de carga aquí también
          console.error("Error al registrar el Pokémon");
        }
      } catch (error) {
        console.error("Error en la solicitud de registro:", error);
      }
    } else {
      console.log("Por favor ingresa un nombre y tipo válidos");
    }
  };

  const handleButtonClick = () => {
    handleEnterClick();
    handleRegisterSubmit();
  };

  return (
    <div data-name="pokedex" className="relative">
      <img
        src={pokedex}
        alt="pokedex.png"
        className="w-screen h-screen object-contain"
      />

      <div
        data-name="screen"
        className="absolute top-[29.5%] left-[24.8%] w-[20%] h-[29%] flex justify-center items-center"
      >
        {loading ? (
          <p className="text-white text-base font-bold font-sans">
            Cargando...
          </p>
        ) : screenState.notFound ? (
          <p className="text-white text-base font-bold font-sans">
            No se encontró el Pokémon
          </p>
        ) : screenState.message ? ( // Mostrar mensaje de éxito
          <p className="text-white text-base font-bold font-sans">
            {screenState.message}
          </p>
        ) : (
          screenState.img && (
            <img
              src={screenState.img}
              alt="Pokemon"
              className="w-full h-full object-contain z-[-100] bg-[#b9d4d4]"
            />
          )
        )}
        {loadingMessage && (
          <p className="text-white text-base font-bold font-sans">
            {loadingMessage}
          </p>
        )}
      </div>

      <div
        data-name="form"
        className="absolute top-[32.5%] left-[56.7%] grid grid-cols-2 grid-rows-3 font-sans text-sm h-max w-[17.5rem] gap-2 p-4 font-bold"
      >
        {preload ? (
          search ? (
            <input
              type="text"
              placeholder="Nombre del Pokemon"
              value={pokemonName}
              onChange={handleInputChange}
              className="bg-white border-b border-white text-black text-bas font-bold font-sans cursor-pointer rounded-md w-[10rem] hover:border-blue-500 focus:outline-none focus:border-none pl-2"
            />
          ) : register ? (
            <div>
              <input
                type="text"
                placeholder="Nombre del Pokemon"
                value={registerName}
                onChange={(e) => handleRegisterInputChange(e, "name")}
                className="bg-white border-b border-white text-black text-sm font-bold font-sans cursor-pointer rounded-md w-[10rem] hover:border-blue-500 focus:outline-none focus:border-none pl-2 mb-2"
              />
              <input
                type="text"
                placeholder="Tipo del Pokemon"
                value={registerType}
                onChange={(e) => handleRegisterInputChange(e, "type")}
                className="bg-white border-b border-white text-black text-sm font-bold font-sans cursor-pointer rounded-md w-[10rem] hover:border-blue-500 focus:outline-none focus:border-none pl-2"
              />
            </div>
          ) : (
            <>
              <button
                onClick={handleSearch}
                className="bg-transparent border-none text-white text-sm font-bold font-sans cursor-pointer rounded-md hover:bg-white hover:text-black transition duration-200 ease-in-out"
              >
                Buscar Pokemon
              </button>
              <button
                onClick={handleRegister}
                className="bg-transparent border-none text-white text-sm font-bold font-sans cursor-pointer rounded-md hover:bg-white hover:text-black transition duration-200 ease-in-out"
              >
                Registrar Pokemon
              </button>
              <button className="bg-transparent border-none text-white text-sm font-bold font-sans cursor-pointer rounded-md hover:bg-white hover:text-black transition duration-200 ease-in-out">
                Eliminar Pokemon
              </button>
              <button className="bg-transparent border-none text-white text-sm font-bold font-sans cursor-pointer rounded-md hover:bg-white hover:text-black transition duration-200 ease-in-out">
                Modificar Pokemon
              </button>
            </>
          )
        ) : (
          <button
            onClick={handlePreload}
            className="bg-transparent border-none text-white text-sm font-bold font-sans cursor-pointer rounded-md hover:bg-white hover:text-black transition duration-200 ease-in-out"
          >
            Cargar Pokemons
          </button>
        )}
      </div>

      {/* <div data-name="numbers" className="absolute top-[23rem] left-[55.3rem] grid grid-cols-5 grid-rows-2 gap-x-2 gap-y-1">
        {Array.from({ length: 10 }, (_, i) => (
          <button key={i} className="bg-transparent text-yellow-400 cursor-pointer h-[2.5rem] w-[3rem] border-none hover:text-blue-500 transform hover:scale-110 hover:rotate-5 transition-transform duration-300 ease-in-out">
            <p className="m-0 p-0">{(i + 1) % 10}</p>
          </button>
        ))}
      </div> */}

      <div
        data-name="buttons"
        className="absolute flex flex-row top-[72%] left-[57.9%] w-[6rem] h-[2.1rem] gap-7"
      >
        <button
          onClick={handleBackClick}
          className="bg-transparent border-none cursor-pointer w-full h-full"
        >
          <img
            src={back}
            alt="back.png"
            className="w-full h-full hover:opacity-80 transform hover:scale-110 transition-transform duration-300 ease-in-out"
          />
        </button>
        <button
          onClick={handleButtonClick}
          className="bg-transparent border-none cursor-pointer w-full h-full"
        >
          <img
            src={enter}
            alt="enter.png"
            className="w-full h-full hover:opacity-80 transform hover:scale-110 transition-transform duration-300 ease-in-out"
          />
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
