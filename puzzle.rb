require 'pry'

class Board
  attr_reader :width, :height

  def initialize(width, height)
    @width = width
    @height = height
  end
end

class Tetramino
  attr_reader :name, :orientations

  def initialize(name, orientations)
    @name = name
    @orientations = orientations
end

class Orientation
  attr_reader :width, :height
  attr_accessor :can_fit

  def initialize(width, height, can_fit)
    @width = width
    @height = height
    @can_fit = can_fit

binding.pry
puts 'EOF'
