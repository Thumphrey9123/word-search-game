class GameSession < ApplicationRecord
    belongs_to :user 
    belongs_to :puzzle_setting
end
