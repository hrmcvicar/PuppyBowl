//If you would like to, you can create a variable to store the API_URL here.
//This is optional. if you do not want to, skip this and move on.

const BASE = "https://fsa-puppy-bowl.herokuapp.com/api/";
const COHORT = "2510-HAYLEY";
const RESOURCE = "/players";
const API = BASE + COHORT + RESOURCE;
//const API = `${BASE}/${COHORT}${RESOURCE}`;

/////////////////////////////
/*This looks like a good place to declare any state or global variables you might need*/
let players = [];
let selectedPlayer = null;

////////////////////////////

/**
 * Fetches all players from the API.
 * This function should not be doing any rendering
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API);
    if (!response.ok)
      throw new Error(`Failed to fetch players: ${response.status}`);
    const json = await response.json();
    players = json.data.players; // array of players
    return players;
  } catch (error) {
    console.error(error);
    alert("Could not load players. Please try again.");
  }
};
//TODO

/**
 * Fetches a single player from the API.
 * This function should not be doing any rendering
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  //TODO
  try {
    const url = `${API}/${playerId}`;
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch player ${playerId}: ${response.status}`);
    const json = await response.json();
    selectedPlayer = json.data.player; // single player object
    return selectedPlayer;
  } catch (error) {
    console.error(error);
    alert("Could not load that player. Please try again.");
  }
};

function playerListItem(player) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = "#selected";
  a.textContent = player.name;
  a.addEventListener("click", (e) => {
    e.preventDefault();
    await fetchSinglePlayer(player.id);
    render();
  });
  li.appendChild(a);
  return li;
}

/** A list of names of all pups */
function playerList() {
  const ul = document.createElement("ul");
  ul.classList.add("roster");
  ul.replaceChildren(...players.map(playerListItem));
  return ul;
}

/** Details or empty-state message */
function playerDetails() {
  const section = document.createElement("div");
  if (!selectedPlayer) {
    const p = document.createElement("p");
    p.textContent = "Please select a pup to learn more.";
    section.appendChild(p);
    return section;
  }

  const { id, name, breed, status, imageUrl, teamId } = selectedPlayer;

  const h3 = document.createElement("h3");
  h3.textContent = name;

  const dl = document.createElement("dl");
  const rows = [
    ["ID", id],
    ["Date", date ? new Date(date).toLocaleString() : "—"],
    ["Location", location ?? "—"],
    ["Description", description ?? "—"],
  ];
  for (const [label, value] of rows) {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = String(value);
    dl.append(dt, dd);
  }

  section.append(h3, dl);
  return section;
}
/**
 * Adds a new player to the roster via the API.
 * Once a player is added to the database, the new player
 * should appear in the all players page without having to refresh
 * @param {Object} newPlayer the player to add
 */
/* Note: we need data from our user to be able to add a new player
 * Do we have a way to do that currently...?
 */
/**
 * Note#2: addNewPlayer() expects you to pass in a
 * new player object when you call it. How can we
 * create a new player object and then pass it to addNewPlayer()?
 */

const addNewPlayer = async (newPlayer) => {
  //TODO
  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //value is object
      },
      body: JSON.stringify(newPlayer), //value is object, parameter
    });
    //const data = await response.json(); //
    //console.log(data.data); //want the object
    //players.push(data.data); //pushing the new object
    if (!res.ok) throw new Error(`POST failed: ${res.status}`);
    await fetchAllPlayers();
    render();
  } catch (error) {
    console.error(error);
    alert("Could not add player.")
  }
};

const form = document.querySelector("#newPlayerForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const newPlayer = {
    name: formData.get("rName"),
    breed: formData.get("breed"),
    status: formData.get("status"),
    imageUrl: formData.get("imgURL"),
    teamId: formData.get("teamId"),
  };
  //console.log(newRecipe);
  addNewPlayer(newPlayer);
});

/**
 * Removes a player from the roster via the API.
 * Once the player is removed from the database,
 * the player should also be removed from our view without refreshing
 * @param {number} playerId the ID of the player to remove
 */
/**
 * Note: In order to call removePlayer() some information is required.
 * Unless we get that information, we cannot call removePlayer()....
 */
/**
 * Note#2: Don't be afraid to add parameters to this function if you need to!
 */

const removePlayer = async (playerId) => {
  //TODO
try {
await fetch(
`${API}/${playerId}`,
  {
method: "DELETE",
}
);
players = players.filter((player) => { //if you are the deleted ID, LEAVE
return player.id !== id; //"if youre not the id deleted, stay"
});
selectedPlayer = null; //need to update this to make sure it goes away in the single player section
render();
} catch (error) {
console.error(error);
}
};


/**
 * Updates html to display a list of all players or a single player page.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player in the all player list is displayed with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, for each player we should be able to:
 * - See details of a single player. The page should show
 *    specific details about the player clicked
 * - Remove from roster. when clicked, should remove the player
 *    from the database and our current view without having to refresh
 *
 */
const listEl = document.querySelector("#player-list");
const detailsEl = document.querySelector("#player-details");

const render = () => {
  // TODO
  /*try {
    const app = document.querySelector("#app");
    app.innerHTML = `
      <h1>Puppy Bowl</h1>
      <main>
        <section>
          <h2>Player List</h2>
          <playerlist></playerlist>
        </section>
        <section id="selected">
          <h2>Player Details</h2>
          <playerdetails></playerdetails>
        </section>
      </main>
    `;
    app.querySelector("playerlist").replaceWith(playerList());
    app.querySelector("playerdetails").replaceWith(playerDetails());
  } catch (err) {
    console.error("Render failed:", err);
    alert("Something went wrong rendering the page.");
  }
};*/
  const html = players.map((player) => {
    return `
            <div>
                <h2 class="rName" data-id=${player.id}>${player.name}</h2>
            </div>
        `;
  });
  //console.log(html);
  playerList.innerHTML = html.join("");
  if (!selectedPlayer) {
    selectedPlayer.innerHTML = `<div><h3>Please select a player to see details!</h3></div>`;
  } else {
    selectedPlayer.innerHTML = `
        <div>
            <h2>${selectedPlayer.name}</h2>
            <p>
                ${selectedPlayer.description}
            </p>
            <img src=${selectedPlayer.imageUrl}/>
            <button class="deleteButton" data-id=${selectedPlayer.id}>Delete</button>
        </div>
    `;
  }
};

/**
 * Initializes the app by calling render
 * HOWEVER....
 */
const init = async () => {
  //Before we render, what do we always need...?
  await fetchAllPlayers();
  render();
};

init();
