import styles from "./Form.module.css";

const Form = () => {
  const handleClick = () => {
    alert("Botón clickeado");
  };

  return (
    <div className={styles.form}>
      <form>
        <button onClick={handleClick}>Buscar Pokemon</button>
      </form>
      <form>
        <button onClick={handleClick}>Buscar Pokemon</button>
      </form>
      <form>
        <button onClick={handleClick}>Buscar Pokemon</button>
      </form>
      <form>
        <button onClick={handleClick}>Buscar Pokemon</button>
      </form>
      <form>
        <button onClick={handleClick}>Buscar Pokemon</button>
      </form>
    </div>
  );
};

export default Form;
