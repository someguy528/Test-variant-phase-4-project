class CartItem < ApplicationRecord
    belongs_to :product
    belongs_to :cart
    validates :product_id, :cart_id, :quantity, presence: true
end
