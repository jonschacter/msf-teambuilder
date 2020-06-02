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
    
}