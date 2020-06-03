class CharactersController < ApplicationController
    def create
        team = Team.find_by(id: params[:team_id])
        character = Character.new(character_params)
        character.position = (team.characters.length + 1)
        if character.save
            render json: character, except: [:created_at, :updated_at]
        else
            render :json => { :errors => character.errors.full_messsages }   
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

        render json: character
    end

    private
    
    def character_params
        params.require(:character).permit(:name, :power, :team_id)
    end
end
