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
}