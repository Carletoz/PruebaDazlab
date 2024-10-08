import pokedex from "../../assets/pokedex.png";
import enter from "../../assets/enterIcon.png";
import back from "../../assets/backIcon.png";
import {useState } from "react";

const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://pruebadazlab-production.up.railway.app'
  : 'http://localhost:3001';

const Pokedex = () => {
  const [preload, setPreload] = useState(false);
  const [search, setSearch] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const [screenState, setScreenState] = useState({
    img: "",
    notFound: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [register, setRegister] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerType, setRegisterType] = useState("");
  const [modify, setModify] = useState(false);
  const [modifyType, setModifyType] = useState("");
  const [deleteName, setDeleteName] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [pokemonType, setPokemonType] = useState([]);

  const handlePreload = async () => {
    setPreload(true);
    setLoadingMessage("Cargando...");
    await preloadData();
    setLoadingMessage("");
    setScreenState({
      img: "",
      notFound: false,
      message: "Pokemons cargados con éxito",
    });
  };


  const handleSearch = () => {
    setSearch(true);
  };

  const handleRegister = () => {
    setRegister(true);
  };

  const handleModify = () => {
    setModify(true);
  };

  const handleDelete = () => {
    setDeleteMode(true);
  };

  const handleDeleteInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeleteName(event.target.value);
  };


  const handleDeleteSubmit = async () => {
    if (deleteName.trim()) {
      try {
        const response = await fetch(
          `${BASE_URL}/pokemon/${deleteName.trim()}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          console.log("Pokémon eliminado con éxito");
          setDeleteName("");
          setScreenState({
            img: "",
            notFound: false,
            message: "Pokemon Eliminado",
          });
        } else {
          console.error("Error al eliminar el Pokémon");
          setScreenState({
            img: "",
            notFound: true,
            message: "No se encontró Pokémon",
          });  
        }
      } catch (error) {
        console.error("Error en la solicitud de eliminación:", error);
      }
    } else {
      console.log(
        "Por favor ingresa un nombre de Pokémon válido para eliminar"
      );
    }
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
    setModify(false);
    setScreenState({ img: "", notFound: false, message: "" });
    setDeleteMode(false);
    setDeleteName("");
    setPokemonType([]);
  };

  const preloadData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/pokemon`);
      const data = await response.json();  
      
      const pokemonCount = data.length; 
      
   
      document.title = `Pokédex - ${pokemonCount} Pokémon disponibles`;
      
    } catch (error) {
      console.error("Error al cargar la lista de Pokémon:", error);
    }
  };

  const fetchData = async (name: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/pokemon/img/${name}`);
      if (!response.ok) {
        setScreenState({ img: "", notFound: true, message: "" });
        setLoading(false);
        return;
      }
      const imgUrl = await response.json();
      setScreenState({ img: imgUrl, notFound: false, message: "" });
      fetchTypes(name);
    } catch (error) {
      console.error("Error fetching data:", error);
      setScreenState({ img: "", notFound: true, message: "" });
    }
    setLoading(false);
  };

  const fetchTypes = async (name: string) => {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/name/${name}`);
      const data = await response.json();
      const types = data.type;
      setPokemonType(types);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

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

  const handleRegisterSubmit = async () => {
    if (registerName.trim() && registerType.trim()) {
      try {
        const response = await fetch(`${BASE_URL}/pokemon`, {
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
          setScreenState({
            img: "",
            notFound: false,
            message: "Pokemon Registrado",
          });
        } else {
          setScreenState({
            img: "",
            notFound: false,
            message: "No se encontro el pokemon",
          });
          setLoadingMessage("");  
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
    handleDeleteSubmit();
    handleUpdate();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModifyType(event.target.value);
  };

  const handleUpdate = async () => {
    if (screenState.img && modifyType.trim()) {
      try {
        const response = await fetch(`${BASE_URL}/pokemon/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: pokemonName.trim(),
            type: [modifyType.trim()],
          }),
        });
        if (response.ok) {
          console.log("Tipo de Pokémon modificado con éxito");
          setModifyType("");
          setScreenState({
            img: "",
            notFound: false,
            message: "Tipo modificado",
          });
        } else {
          console.error("Error al modificar el tipo del Pokémon");
        }
      } catch (error) {
        console.error("Error en la solicitud de modificación:", error);
      }
    } else {
      console.log(
        "Por favor asegúrate de que el Pokémon esté mostrado y que el tipo a modificar no esté vacío"
      );
    }
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
        className="absolute top-[29.5%] left-[24.8%] w-[20%] h-[30%] flex justify-center items-center"
      >
        {loading ? (
          <p className="text-white text-base font-bold font-sans">
            Cargando...
          </p>
        ) : screenState.notFound ? (
          <p className="text-white text-base font-bold font-sans">
            No se encontró el Pokémon
          </p>
        ) : screenState.message ? (
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
        data-name="typeDisplay"
        className="absolute top-[82.5vh] left-[27vw] flex flex-col text-white text-[1.4rem] font-bold font-sans w-[9.5vw] h-[9.5vh] justify-center items-center"
      >
        {pokemonType.map((type, index) => (
          <p key={index} className="text-white text-b font-bold font-Afacad Flux">
            {type}
          </p>
        ))}
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
          ) : modify ? (
            <form>
              <input
                type="text"
                placeholder="Nombre del Pokemon"
                value={pokemonName}
                onChange={handleNameChange}
                className="bg-white border-b border-white text-black text-bas font-bold font-sans cursor-pointer rounded-md w-[10rem] hover:border-blue-500 focus:outline-none focus:border-none pl-2"
              />
              {screenState.img && (
                <>
                  <input
                    type="text"
                    placeholder="Tipo a modificar"
                    value={modifyType}
                    onChange={handleTypeChange}
                    className="bg-white border-b border-white text-black text-bas font-bold font-sans cursor-pointer rounded-md w-[10rem] hover:border-blue-500 focus:outline-none focus:border-none pl-2 mt-2"
                  />
                </>
              )}
            </form>
          ) : deleteMode ? (
            <div>
              <input
                type="text"
                placeholder="Pokemon a eliminar"
                value={deleteName}
                onChange={handleDeleteInputChange}
                className="bg-white border-b border-white text-black text-sm font-bold font-sans cursor-pointer rounded-md w-[9.5rem] hover:border-blue-500 focus:outline-none focus:border-none pl-2 mb-2"
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
              <button
                onClick={handleDelete}
                className="bg-transparent border-none text-white text-sm font-bold font-sans cursor-pointer rounded-md hover:bg-white hover:text-black transition duration-200 ease-in-out"
              >
                Eliminar Pokemon
              </button>
              <button
                onClick={handleModify}
                className="bg-transparent border-none text-white text-sm font-bold font-sans cursor-pointer rounded-md hover:bg-white hover:text-black transition duration-200 ease-in-out"
              >
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