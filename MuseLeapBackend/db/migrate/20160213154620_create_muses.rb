class CreateMuses < ActiveRecord::Migration
  def change
    create_table :muses do |t|
      t.integer :state
      t.integer :statecounter
      t.float :prevtime
      t.float :beforetime
      t.float :startime
      t.float :currtime
      t.integer :counter
      t.timestamps null: false
    end
  end
end
