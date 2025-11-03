//API const
/*const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2510-HAYLEY";
const RESOURCE = "/players";
const API = BASE + COHORT + RESOURCE;*/

//state
let players = [];
let singlePlayer;

const allPlayers = document.querySelector("#allPlayers");
const singlePlayerDiv = document.querySelector("#singlePlayer");

const render = () => {
  const html = players.map((player) => {
    return `
            <div>
                <h2 class="pName" data-id="${player.id}">${player.name}</h2>
            </div>
            `;
  });
  allPlayers.innerHTML = html.join("");
  singlePlayerDiv.innerHTML = singlePlayer
    ? `
  <div>
    <h2>${singlePlayer.name}</h2>
    <h2>${singlePlayer.breed}</h2>
  </div>
    `
    : "Click a player to learn more!";
  //add delete button above div
};

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2510-hayley/players"
    );
    const data = await response.json();
    console.log(data.data);
    players = data.data;
  } catch (error) {
    console.error(error);
  }
};

fetchAllPlayers();

allPlayers.addEventListener("click", async (event) => {
  if (event.target.classList.contains("pName")) {
    const id = event.target.getAttribute("data-id") * 1;
    console.log(id);
  }
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2510-hayley/players/{id}"
    );
    const data = await response.json();
    console.log(data.data);
    singlePlayer = data.data;
    render();
  } catch (error) {
    console.error(error);
  }
});
