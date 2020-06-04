const BASE_URL = "http://localhost:3000";
const TEAMS_URL = `${BASE_URL}/teams`;
const CHARS_URL = `${BASE_URL}/characters`;

window.addEventListener("DOMContentLoaded", (event) => {
    const teamFormContainer = document.querySelector(".form-container")
    teamFormContainer.addEventListener("submit", addNewTeam);
    populateTeams();
});

function populateTeams(){
    fetch(TEAMS_URL)
        .then(resp => resp.json())
        .then(teams => {
            teams.forEach(team => {
                htmlifySingleTeam(team, null);
            })
        });
}

function htmlifySingleTeam(team, fedDiv){
    const teamListDiv = document.getElementById("team-list");
    let div = null
    if (fedDiv === null) {
        div = document.createElement("div");
        teamListDiv.appendChild(div);
    } else {
        div = fedDiv;
    }
    const p = document.createElement("p");
    const button = document.createElement("button");
    const ul = document.createElement("ul");
    const form = document.createElement("form");
    const nameInput = document.createElement("input");
    const powerInput = document.createElement("input");
    const hiddenInput = document.createElement("input");
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

    hiddenInput.type = "hidden";
    hiddenInput.name = "team_id";
    hiddenInput.value = `${team.id}`

    submitInput.type = "submit";
    submitInput.value = "Add";

    p.appendChild(button);
    form.appendChild(nameInput);
    form.appendChild(powerInput);
    form.appendChild(hiddenInput);
    form.appendChild(submitInput);

    div.appendChild(p);
    div.appendChild(form);
    div.appendChild(ul);

    submitInput.addEventListener("click", addNewCharacter);
    team.sorted_characters.forEach(character => htmlifyCharacter(character));
    div.querySelectorAll("li").forEach(addCharacterButtons)
}

function addCharacterButtons(li, index) {
    // up button
    if (index > 0) {
        const upButton = document.createElement("button");
        upButton.innerText = "^"
        li.appendChild(upButton);
        upButton.addEventListener("click", function(){
        moveCharacter("up");
        });
    };

    // down button
    if (index < li.parentElement.children.length - 1) {
        const downButton = document.createElement("button");
        downButton.innerText = "v"
        li.appendChild(downButton);
        downButton.addEventListener("click", function(){
            moveCharacter("down");
        });
    }

    // delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "-"
    li.appendChild(deleteButton);
    deleteButton.addEventListener("click", deleteCharacter);
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
        .then(data => htmlifySingleTeam(data, null))
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
    const div = event.target.parentElement.parentElement;
    const formNode = event.target.parentElement.querySelectorAll("input")
    const characterObject = {
        name: formNode[0].value,
        power: formNode[1].value,
        team_id: formNode[2].value
    }
    fetch(CHARS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(characterObject)
    })
    .then(resp => resp.json())
    .then(data => refreshTeam(data))
    .catch(error => console.log(error))
}

function htmlifyCharacter(character){
    const ul = document.querySelectorAll(`*[team-id='${character.team_id}']`)[0].querySelector("ul")
    const li = document.createElement("li");

    li.setAttribute("character-id", `${character.id}`)
    li.innerText = `${character.name} - ${character.power}   `

    ul.appendChild(li);

    // hide form if full team - show if incomplete
    if (ul.childElementCount >= 5){
        ul.parentElement.querySelector("form").style.display = "none";
    } else {
        ul.parentElement.querySelector("form").style.display = "block";
    }
}

function deleteCharacter(event){
    const liNode = event.target.parentElement
    fetch(`${CHARS_URL}/${liNode.getAttribute("character-id")}`, {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => refreshTeam(data))
    .catch(error => console.log(error))
}

function moveCharacter(direction){
    // direction is either "up" or "down"
    fetch(`${CHARS_URL}/${event.target.parentElement.getAttribute("character-id")}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({move: direction})
    })
    .then(resp => resp.json())
    .then(data => refreshTeam(data))
}

function refreshTeam(team) {
    const div = document.querySelectorAll(`*[team-id='${team.id}']`)[0];
    div.innerHTML = "";
    htmlifySingleTeam(team, div);
}