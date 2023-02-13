class Order < ApplicationRecord
    belongs_to :buyer, class_name: 'User', foreign_key: :buyer_id, required: true
    has_many :order_items, dependent: :destroy 
    validates :buyer_id, :status, :price_total, :delivery_date, presence: true


    def price_total_calculate
        all_prices = self.order_items.map do |i|
            i.quantity * i.product.price
        end
        all_prices.sum
    end
    def price_total_update
        self.update(price_total: self.price_total_calculate)
    end
end
