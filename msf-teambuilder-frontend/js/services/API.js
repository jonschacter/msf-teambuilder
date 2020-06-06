class API {
    static teamsUrl = "http://localhost:3000/teams"
    static charsUrl = "http://localhost:3000/characters"

    static options = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    static get(url){
        return(
            fetch(url)
            .then(resp => resp.json())
        )
    }

    static postTeam(data){
        const options = {
            ...API.options,
            method: "POST",
            body: JSON.stringify(data)
        };

        fetch(API.teamsUrl, options)
        .then(resp => resp.json())
        .then((data) => {
            if (!data.errors){
                new Team(data);
                Team.renderTeams();
                clearNewTeamForm();
            } else {
                displayError(data.errors);
            }
        })
        .catch(alert)
    }

    static postCharacter(data){
        const options = {
            ...API.options,
            method: "POST",
            body: JSON.stringify(data)
        }
        fetch(API.charsUrl, options)
        .then(resp => resp.json())
        .then((data) => {
            if (!data.errors){
                const team = Team.findById(data.team_id)
                team.addNewCharacter(data);
                team.refresh();
            } else {
                displayError(data.errors);
            }
        })
        .catch(alert)
    }

    static deleteTeam(id){
        const options = {
            ...API.options,
            method: "DELETE"
        }

        const url = API.teamsUrl + `/${id}`

        fetch(url,options)
        .then(resp => resp.json())
        .then((data) => {
            const index = Team.all.findIndex((team) => team.id === data.id)
            Team.all.splice(index, 1)
            Team.renderTeams();
        })
        .catch(alert)
    }

    static deleteCharacter(id){
        const options = {
            ...API.options,
            method: "DELETE"
        }

        const url = API.charsUrl + `/${id}`

        fetch(url,options)
        .then(resp => resp.json())
        .then((data) => {
            const team = Team.findById(data.team_id);
            const index = team.characters.findIndex((character) => character.id === data.id)
            team.characters.splice(index, 1)
            team.refresh();
        })
        .catch(alert)
    }

    static moveCharacter(id, direction) {
        const options = {
            ...API.options,
            method: "PATCH",
            body: JSON.stringify({move: direction})
        }

        const url = API.charsUrl + `/${id}`

        fetch(url, options)
        .then(resp => resp.json())
        .then(data => {
            const team = Team.findById(data.team_id);
            const character = Character.findById(data.id);
            character.position = data.position;
            team.refresh();
        })
    }
}