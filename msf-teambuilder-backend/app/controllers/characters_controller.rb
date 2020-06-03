class CharactersController < ApplicationController
    def create
        character = Character.new(character_params)
        if character.save
            render json: character, except: [:created_at, :updated_at]
        else
            render :json => { :errors => character.errors.full_messsages }   
        end
    end

    private
    
    def character_params
        params.require(:character).permit(:name, :power, :team_id)
    end
end
