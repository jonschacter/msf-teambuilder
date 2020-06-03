class AddPositionToCharacters < ActiveRecord::Migration[6.0]
  def change
    add_column :characters, :position, :integer
  end
end
