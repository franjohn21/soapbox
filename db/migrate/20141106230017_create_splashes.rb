class CreateSplashes < ActiveRecord::Migration

  def change
  	create_table :splashes do |t|
  		t.string :content
  		t.float :latitude, :longitude
  		t.references :author

  		t.timestamps
  	end
    add_index :splashes, :latitude
    add_index :splashes, :longitude
  end
end
