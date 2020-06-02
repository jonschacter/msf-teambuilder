class TeamsController < ApplicationController
    def index
        teams = Team.all
        render json: teams.as_json(:include => {
            :characters => {
                :except => [:team_id, :created_at, :updated_at]
            }
        }, :except => [:created_at, :updated_at])
    end
end
