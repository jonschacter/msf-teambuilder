class Team {
    static all = []

    constructor(){

    }

    static loadTeams(){
        console.log(API.get(API.teamsUrl))
    }
}