class Team {
    static all = []

    constructor({id, name, characters}){
        this.id = id;
        this.name = name;
        this.characters = [];
        characters.forEach((character) =>{
            const newChar = new Character(character);
            this.characters.push(newChar);
        });
        Team.all.push(this);
    }

    htmlifyTeam(){
        return(`
            <div class="team-card" team-id="${this.id}">
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
                <ul>
                </ul>
            </div>
        `)
    }

    renderTeam(){
        teamList.innerHTML += this.htmlifyTeam();
        this.characters.forEach((character)=>character.renderCharacter())
        if (this.characters.length >= 5){
            this.characterForm().style.display = "none";
        } else {
            this.characterForm().style.display = "block";
        }
    }

    characterForm(){
        return document.querySelectorAll(`*[team-id='${this.id}']`)[0].querySelector(".character-form")
    }

    static loadTeams(){
        API.get(API.teamsUrl)
        .then(teams=>{
            teams.forEach(team => new Team(team));
            Team.renderTeams();
        });
    }

    static renderTeams(){
        teamList.innerHTML = "";
        Team.all.forEach(team => team.renderTeam());
    }
}