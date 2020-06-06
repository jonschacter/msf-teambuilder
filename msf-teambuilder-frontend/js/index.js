document.addEventListener("DOMContentLoaded", function(){
    Team.loadTeams();
    mountTeamFormListener();
    eventDelegation();
})

const teamList = document.getElementById("team-list");
const teamForm = document.querySelector(".form-container");
const teamInput = document.querySelector(".input-text");

function mountTeamFormListener(){
    teamForm.addEventListener("submit", function(event){
        event.preventDefault();
        const nameNode = event.target.querySelector(".input-text")
        const newTeamObject = {name: nameNode.value}
        API.postTeam(newTeamObject);
    });
}

function displayError(errorArray) {
    const div = document.getElementById("error-message-div")
    errorArray.forEach(function(message){
        const p = document.createElement("p");
        p.innerText = message;
        div.appendChild(p);
    })
    setTimeout(function(){
        div.innerHTML = "";
    }, 5000);
}

function clearNewTeamForm(){
    teamInput.value = "";
}

function eventDelegation(){
    teamList.addEventListener("click",function(event){
        if (event.target.className === "team-delete-button") {
            const id = event.target.parentElement.parentElement.getAttribute("team-id");
            API.deleteTeam(id);
        } else if (event.target.className === "character-delete-button") {
            const id = event.target.parentElement.getAttribute("character-id");
            API.deleteCharacter(id);
        } else if (event.target.className === "up-button") {
            const id = event.target.parentElement.getAttribute("character-id");
            API.moveCharacter(id, "up");
        } else if (event.target.className === "down-button") {
            const id = event.target.parentElement.getAttribute("character-id");
            API.moveCharacter(id, "down");
        }
    });
}