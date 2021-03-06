class CharactersController < ApplicationController
    def create
        character = Character.new(character_params)
        character.position = (character.team.characters.length + 1)
        if character.save
            render json: character.as_json(:except => [:created_at, :updated_at])
        else
            render :json => { :errors => character.errors.full_messages }   
        end
    end

    def destroy
        character = Character.find_by(id: params[:id])
        team = character.team
        character.destroy

        team.characters.each do |other_team_char|
            if other_team_char.position > character.position
                other_team_char.move_up
            end
        end

        render json: character.as_json(:except => [:created_at, :updated_at])
    end

    def update
        character = Character.find_by(id: params[:id])
        team = character.team

        if params[:move] == "up"
            displaced_char = team.characters.find_by(position: (character.position - 1))
            displaced_char.move_down
            character.move_up
        elsif params[:move] == "down"
            displaced_char = team.characters.find_by(position: (character.position + 1))
            displaced_char.move_up
            character.move_down
        end
        
        render json: {
            character: character.as_json(:except => [:created_at, :updated_at]),
            displaced_character: displaced_char.as_json(:except => [:created_at, :updated_at])
        }
    end

    private
    
    def character_params
        params.require(:character).permit(:name, :power, :team_id)
    end
end
