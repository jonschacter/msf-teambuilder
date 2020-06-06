class Character {
    static all = []

    constructor({id, name, power, team_id, position}){
        this.id = id;
        this.name = name;
        this.power = power;
        this.team_id = team_id;
        this.position = position;
        Character.all.push(this);
    }


    renderCharacter(){
        const ul = document.querySelectorAll(`*[team-id='${this.team_id}']`)[0].querySelector("ul");
        ul.innerHTML += this.htmlifyCharacter();
    }
    
    htmlifyCharacter(){
        return(`
            <li character-id="${this.id}">
                ${this.name} - ${this.power}
            </li>
        `)
    }

    static findById(id){
        return Character.all.find(character => character.id === id)
    }
}