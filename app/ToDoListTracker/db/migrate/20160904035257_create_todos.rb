class CreateTodos < ActiveRecord::Migration[5.0]
  def change
    create_table :todos do |t|
      t.string :description
      t.string :priority
      t.integer :list_id

      t.timestamps
    end
  end
end
