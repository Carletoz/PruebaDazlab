
# Pokedex

Bienvenido a esta app hecha por mi que simula el funcionamiento de una pokedex como en el famoso anime "Pokemon"



## Pasos para usar la Pokedex


1. Configurar las variables de entorno.
- Dentro de la carpeta back podras encontrar un archivo ".env.example" usalo como referencia para hacer tu propio ".env" que debe estar en la raiz de la carpeta "back"

2. Iniciar el back. 
- Abre la terminal integrada en y accede a la carpeta "back"
- Ejecuta el comando "npm start"
- Si todo fue bien deberia aparecerte en la consola:

        "Connected to the database
        Server is running on port 3001" 

3. Iniciar el front.
- Abre la terminal integrada en y accede a la carpeta "front"
- Ejecuta el comando "npm run dev"
- Si todo fue bien deberia aparecerte en la consola:

          VITE v5.4.8  ready in 382 ms

        ➜  Local:   http://localhost:5173/
        ➜  Network: use --host to expose
        ➜  press h + enter to show help

4. Hacer Clic en la url o copiar y pegarla en el navegador 
 
## Instrucciones de uso

RECOMENDACION: en el navegador si tienes la barra de favoritos desactivada, activala para una experiencia optima.

<span style="color: yellow;">ADVERTENCIA: Al clickear por primera vez en "Cargar Pokemons" se mostrara un mensaje que dice "Cargando.." esto puede tarda unos minutos ya que se estara haciendo una llamada a la API y se guardaran en la BD, una vez que diga "Pokemos cargados con exito" ya puedes usar la pokedex</span>

- El usuario interactuara con la pokedex mediante botones que se mostraran en la pantalla de la derecha

- Debajo de la pantalla derecha se encuentran dos botonos los cuales el usuario debera clickear ya sea para enviar infomracion o cancelar

- la pantalla de la izquierda solo sera de lectura y mostrara infomracion dependiendo de lo que haga el usuario 

RECOMENDACION: ingresar nombre de pokemons reales y en "minuscula" para que puedas ver su imagen en la pantalla izquierda
