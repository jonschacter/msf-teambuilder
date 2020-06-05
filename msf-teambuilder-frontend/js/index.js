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
        API.post(newTeamObject, API.teamsUrl);
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

function clearForm(){
    teamInput.value = "";
}

function eventDelegation(){
    teamList.addEventListener("click",function(event){
        if (event.target.className === "team-delete-button") {
            console.log("DELETING TEAM");
            const id = event.target.parentElement.parentElement.getAttribute("team-id");
            API.deleteTeam(id);
        }
    });
}

// function addCharacterButtons(li, index) {
//     // up button
//     if (index > 0) {
//         const upButton = document.createElement("button");
//         upButton.innerText = "^"
//         li.appendChild(upButton);
//         upButton.addEventListener("click", function(){
//         moveCharacter("up");
//         });
//     };

//     // down button
//     if (index < li.parentElement.children.length - 1) {
//         const downButton = document.createElement("button");
//         downButton.innerText = "v"
//         li.appendChild(downButton);
//         downButton.addEventListener("click", function(){
//             moveCharacter("down");
//         });
//     }

//     // delete button
//     const deleteButton = document.createElement("button");
//     deleteButton.innerText = "-"
//     li.appendChild(deleteButton);
//     deleteButton.addEventListener("click", deleteCharacter);
// }

// function addNewCharacter(event){
//     event.preventDefault();
//     const div = event.target.parentElement.parentElement;
//     const formNode = event.target.parentElement.querySelectorAll("input")
//     const characterObject = {
//         name: formNode[0].value,
//         power: formNode[1].value,
//         team_id: formNode[2].value
//     }
//     fetch(CHARS_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(characterObject)
//     })
//     .then(resp => resp.json())
//     .then(data => {
//         if (!data.errors) {
//             refreshTeam(data);
//         } else {
//             displayError(data.errors);
//         }
//     })
// }

// function htmlifyCharacter(character){
//     const ul = document.querySelectorAll(`*[team-id='${character.team_id}']`)[0].querySelector("ul")
//     const li = document.createElement("li");

//     li.setAttribute("character-id", `${character.id}`)
//     li.innerText = `${character.name} - ${character.power}   `

//     ul.appendChild(li);

//     // hide form if full team - show if incomplete
//     if (ul.childElementCount >= 5){
//         ul.parentElement.querySelector("form").style.display = "none";
//     } else {
//         ul.parentElement.querySelector("form").style.display = "block";
//     }
// }

// function deleteCharacter(event){
//     const liNode = event.target.parentElement
//     fetch(`${CHARS_URL}/${liNode.getAttribute("character-id")}`, {
//         method: "DELETE"
//     })
//     .then(resp => resp.json())
//     .then(data => refreshTeam(data))
// }

// function moveCharacter(direction){
//     // direction is either "up" or "down"
//     fetch(`${CHARS_URL}/${event.target.parentElement.getAttribute("character-id")}`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({move: direction})
//     })
//     .then(resp => resp.json())
//     .then(data => refreshTeam(data))
// }
