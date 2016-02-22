class CreatePatients < ActiveRecord::Migration
  def change
    create_table :patients do |t|
      t.integer :week
      t.float :rangeofmotion
      t.timestamps null: false
    end
  end
end
