class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.references :buyer, null: false, foreign_key: {to_table: :users}
      t.string :status
      t.date :delivery_date
      t.decimal :price_total, precision: 10, scale: 2

      t.timestamps
    end
  end
end
