class CreateCarts < ActiveRecord::Migration[7.0]
  def change
    create_table :carts do |t|
      t.references :buyer, null: false, foreign_key: {to_table: :users}
      t.string :status
      t.decimal :price_total, precision: 10, scale: 2

      t.timestamps
    end
  end
end

# , precision: 10, scale: 2