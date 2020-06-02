const BASE_URL = "http://localhost:3000";
const TEAMS_URL = `${BASE_URL}/teams`;

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded");
    populateTeams();
});

function populateTeams(){
    fetch(TEAMS_URL)
        .then(resp => resp.json())
        .then(teams => htmlifyTeams(teams));
}

function htmlifyTeams(teamsData){
    teamsData.forEach(team => {
        const main = document.querySelector("main");
        const div = document.createElement("div");
        const p = document.createElement("p");
        const ul = document.createElement("ul");

        div.classList.add("team-card");
        div.setAttribute("team-id", `${team.id}`);

        p.innerText = `${team.name}`

        htmlifyCharacterForTeam(team, ul)

        div.appendChild(p);
        div.appendChild(ul);
        main.appendChild(div);
    })
}

function htmlifyCharacterForTeam(team, ul){
    team.characters.forEach(character => {
        const li = document.createElement("li");

        li.innerText = `${character.name} - ${character.power}`
        ul.appendChild(li);
    })
}