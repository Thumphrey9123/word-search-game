class User < ApplicationRecord
    has_many :game_sessions
    has_many :puzzle_settings, through :game_sessions
end
