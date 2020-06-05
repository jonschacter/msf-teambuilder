class Team {
    static all = []

    constructor({id, name, sorted_characters}){
        this.id = id;
        this.name = name;
        this.characters = sorted_characters;
        Team.all.push(this)
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