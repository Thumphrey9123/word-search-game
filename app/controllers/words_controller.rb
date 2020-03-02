class WordsController < ApplicationController
    def show
        word = Word.find(params[:id])
        render json: word
    end
    
    def index
        words = Word.all
        render json: words
    end
end
