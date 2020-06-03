const BASE_URL = "http://localhost:3000";
const TEAMS_URL = `${BASE_URL}/teams`;

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
        htmlifyTeam(team);
    })
}

function htmlifyTeam(team){
    const teamListDiv = document.getElementById("team-list");
        const div = document.createElement("div");
        const p = document.createElement("p");
        const button = document.createElement("button");
        const ul = document.createElement("ul");

        div.classList.add("team-card");
        div.setAttribute("team-id", `${team.id}`);

        p.innerText = `${team.name}   `;

        button.textContent = "Delete";
        button.addEventListener("click", deleteTeam);

        htmlifyCharacterForTeam(team, ul);

        p.appendChild(button);
        div.appendChild(p);
        // div.appendChild(button);
        div.appendChild(ul);
        teamListDiv.appendChild(div);
}

function htmlifyCharacterForTeam(team, ul){
    team.characters.forEach(character => {
        const li = document.createElement("li");
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
        .then(data => htmlifyTeam(data))
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