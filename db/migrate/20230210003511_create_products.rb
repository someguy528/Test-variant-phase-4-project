class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.decimal :price, precision: 10, scale: 2
      t.boolean :available
      t.references :seller, null: false, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
