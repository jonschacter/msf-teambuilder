// const BASE_URL = "http://localhost:3000";
// const TEAMS_URL = `${BASE_URL}/teams`;
// const CHARS_URL = `${BASE_URL}/characters`;

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

    static post(data, url){
        const options = {
            ...API.options,
            method: "POST",
            body: JSON.stringify(data)
        };

        fetch(url, options)
        .then(resp => resp.json())
        .then((data) => {
            if (!data.errors){
                new Team(data);
                Team.renderTeams();
                clearForm();
            } else {
                displayError(data.errors);
            }
        })
        .catch(alert)
    }
}