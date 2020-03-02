class PuzzleSettingsController < ApplicationController
    def show
        puzzleSetting = PuzzleSetting.find(params[:id])
        render json: puzzleSetting
    end
    
    def index
        puzzleSettings = PuzzleSetting.all
        render json: puzzleSettings
    end
end
