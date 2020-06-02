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

        div.classList.add("team-card");
        div.setAttribute("team-id", `${team.id}`);

        p.innerText = `${team.name}`

        div.appendChild(p);
        main.appendChild(div);
    })
}