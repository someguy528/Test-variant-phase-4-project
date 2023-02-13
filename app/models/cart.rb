class Cart < ApplicationRecord
    belongs_to :buyer, class_name: "User", foreign_key: "buyer_id", required: true
    validates :buyer_id, :status, :price_total, presence: true
    has_many :cart_items, dependent: :destroy
    has_many :products, through: :cart_items

    def newCart
        self.create!({
            buyer_id: self.buyer_id,
            status: "open",
            price_total: "0.00"
        })
    end
    def price_total_update
        all_prices = self.cart_items.map do |i|
            i.quantity * i.product.price.to_f
        end
        sum_prices = all_prices.sum
        self.update(price_total: sum_prices)
    end
end
