class TeamsController < ApplicationController
    def index
        teams = Team.all
        render json: teams.as_json(:include => {
            :characters => {
                :except => [:created_at, :updated_at]
            }
        }, :except => [:created_at, :updated_at])
    end

    def create
        team = Team.new(team_params)
        if team.save
            render json: team.as_json(:include => {
                :characters => {
                    :except => [:created_at, :updated_at]
                }
            }, :except => [:created_at, :updated_at])
        else
            render :json => { :errors => team.errors.full_messsages }
        end
    end

    def destroy
        team = Team.find_by(id: params[:id])
        team.destroy
        render json: team
    end

    private

    def team_params
        params.require(:team).permit(:name)
    end
end
