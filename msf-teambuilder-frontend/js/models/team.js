class Team {
    static all = []

    constructor({id, name, characters}){
        this.id = id;
        this.name = name;
        this.characters = [];
        characters.forEach((character) =>{
            this.addNewCharacter(character);
        });
        Team.all.push(this);
    }

    addNewCharacter(character){
        const newChar = new Character(character);
        this.characters.push(newChar);
    }

    htmlifyTeam(){
        return(`
            <p>
                ${this.name}
                <button class="team-delete-button">Delete</button>
            </p>
            <form action="${API.charsUrl}" method="POST" class="character-form">
                <input type="text" name="name" placeholder="Name" value="">
                <input type="number" name="power" placeholder="Power" value="">
                <input type="hidden" name="team_id" value="${this.id}">
                <input type="submit" value="Add Character">
            </form>
            <ul></ul>
        `)
    }

    renderTeam(){
        // create div if it doesn't exist
        if (!this.div) {
            this.createDiv();
        }
        this.div.innerHTML += this.htmlifyTeam();
        // sort characters by position and render
        this.characters.sort((a, b) => (a.position > b.position) ? 1:-1).forEach((character)=>character.renderCharacter())
        
        this.addCharacterButtons();
        
        // toggle form if team is full
        if (this.characters.length >= 5){
            this.characterForm().style.display = "none";
        } else {
            this.characterForm().style.display = "block";
        }
        
        this.addCharacterFormListener();
    }

    addCharacterFormListener(){
        this.characterForm().addEventListener("submit", function(event){
            event.preventDefault();
            const formNodes = event.target.parentElement.querySelectorAll("input");
            const characterObj = {
                character: {
                    name: formNodes[0].value,
                    power: formNodes[1].value,
                    team_id: formNodes[2].value
                }  
            }
            API.postCharacter(characterObj);
        })
    }

    refresh(){
        this.div.innerHTML = ""
        this.renderTeam();
    }

    addCharacterButtons(){
        const liNodes = this.div.querySelectorAll("li")
        liNodes.forEach(function(li, index){
            // up button
            if (index > 0) {
                li.innerHTML += `<button class="up-button">^</button>`
            }
            // down button
            if (index < li.parentElement.children.length - 1) {
                li.innerHTML += `<button class="down-button">v</button>`
            }
            // delete button
            li.innerHTML += `<button class="character-delete-button">-</button>`
        })
    }

    createDiv(){
        teamList.innerHTML += `<div class="team-card" team-id="${this.id}"></div>`
    }

    get div(){
        return document.querySelectorAll(`*[team-id='${this.id}']`)[0];
    }

    characterForm(){
        return document.querySelectorAll(`*[team-id='${this.id}']`)[0].querySelector(".character-form");
    }

    static loadTeams(callback){
        API.get(API.teamsUrl)
        .then(teams=>{
            teams.forEach(team => new Team(team));
            Team.renderTeams();
        })
    }

    static renderTeams(){
        teamList.innerHTML = "";
        Team.all.forEach(team => team.renderTeam());
    }

    static findById(id){
        return Team.all.find(team => team.id === id)
    }
}