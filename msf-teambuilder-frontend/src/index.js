const BASE_URL = "http://localhost:3000";
const TEAMS_URL = `${BASE_URL}/teams`;
const CHARS_URL = `${BASE_URL}/characters`;

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded");
    const teamFormContainer = document.querySelector(".form-container")
    teamFormContainer.addEventListener("submit", addNewTeam);
    populateTeams();
});

function populateTeams(){
    fetch(TEAMS_URL)
        .then(resp => resp.json())
        .then(teams => htmlifyTeams(teams));
}

function htmlifyTeams(teamsData){
    teamsData.forEach(team => {
        htmlifySingleTeam(team);
    })
}

function htmlifySingleTeam(team){
    const teamListDiv = document.getElementById("team-list");
        const div = document.createElement("div");
        const p = document.createElement("p");
        const button = document.createElement("button");
        const ul = document.createElement("ul");
        const form = document.createElement("form");
        const nameInput = document.createElement("input");
        const powerInput = document.createElement("input");
        const submitInput = document.createElement("input");

        div.classList.add("team-card");
        div.setAttribute("team-id", `${team.id}`);

        p.innerText = `${team.name}   `;

        button.textContent = "Delete";
        button.addEventListener("click", deleteTeam);

        form.action = CHARS_URL;
        form.method = "POST";
        form.classList.add("character-form");

        nameInput.type = "text";
        nameInput.name = "name";
        nameInput.placeholder = "Name";
        nameInput.value = "";

        powerInput.type = "number";
        powerInput.name = "power";
        powerInput.placeholder = "Power";
        powerInput.value = "";

        submitInput.type = "submit";
        submitInput.value = "Add";

        htmlifyCharactersForTeam(team, ul);

        p.appendChild(button);
        form.appendChild(nameInput);
        form.appendChild(powerInput);
        form.appendChild(submitInput);

        div.appendChild(p);
        div.appendChild(form);
        div.appendChild(ul);

        teamListDiv.appendChild(div);

        submitInput.addEventListener("click", addNewCharacter);
}

function htmlifyCharactersForTeam(team, ul){
    team.characters.forEach(character => {
        const li = document.createElement("li");
        li.setAttribute("character-id", `${character.id}`)
        li.innerText = `${character.name} - ${character.power}`
        ul.appendChild(li);
    })
}

function addNewTeam(event){
    event.preventDefault();
    const nameNode = event.target.querySelector(".input-text")
    const newTeamObject = {name: nameNode.value}
    fetch(TEAMS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newTeamObject)
    })
        .then(resp => resp.json())
        .then(data => htmlifySingleTeam(data))
        .then(() => {
            nameNode.value = "";
        })
}

function deleteTeam(event){
    const div = event.target.parentElement.parentElement
    const teamId = div.getAttribute("team-id")
    fetch(`${TEAMS_URL}/${teamId}`, {
        method: "DELETE"
    })
        .then(div.remove());
}

function addNewCharacter(event){
    event.preventDefault();
    console.log("submitting character info");
}