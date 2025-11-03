//API const
/*const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2510-HAYLEY";
const RESOURCE = "/players";
const API = BASE + COHORT + RESOURCE;*/

//state
let players = [];
let singlePlayer = null;

const allPlayers = document.querySelector("#allPlayers");
const singlePlayerDiv = document.querySelector("#singlePlayer");
const addNewPlayerForm = document.querySelector("#newPlayerForm");
console.log("players in render:", players);

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
    <button class="playerDelete" data-id="${singlePlayer.id}">Delete</button>
  </div>
    `
    : "Click a player to learn more!";
  //add delete button above div
};

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2510-HAYLEY/players"
    );
    const json = await response.json();
    console.log(json.data.players); //neded json!
    players = json.data.players;
    render();
  } catch (error) {
    console.error(error);
  }
};

fetchAllPlayers();

allPlayers.addEventListener("click", async (event) => {
  if (event.target.classList.contains("pName")) {
    const id = event.target.getAttribute("data-id") * 1;
    console.log(id);

    /*  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2510-HAYLEY/players/{id}"
    );
    const data = await response.json();
    console.log(data.data);
    singlePlayer = data.data;
    render();
  } catch (error) {
    console.error(error);*/
    //I couldnt get try to work so going w find
    singlePlayer = players.find((player) => {
      return player.id === id;
    });
    render();
  }
});

addNewPlayerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(addNewPlayerForm);
  const newPlayer = {
    name: formData.get("name"),
    breed: formData.get("breed"),
  };
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2510-HAYLEY/players",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newPlayer),
      }
    );
    const data = await response.json();
    players.push(data.data.players);
    render();
  } catch (error) {
    console.error(error);
  }
});

singlePlayerDiv.addEventListener("click", async (event) => {
  if (event.target.classList.contains("playerDelete")) {
    const id = event.target.getAttribute("data-id") * 1;
    console.log(id);
    try {
      await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2510-HAYLEY/players/${id}`,
        {
          method: "DELETE",
        }
      );
      players = players.filter((player) => {
        return player.id !== id;
      });
      singlePlayer = null;
      render();
    } catch (error) {
      console.error(error);
    }
  }
});
