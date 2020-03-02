class GameSessionsController < ApplicationController
    def show
        gameSession = GameSession.find(params[:id])
        render json: gameSession
    end
    
    def index
        gameSessions = GameSession.all
        render json: gameSessions
    end
end
