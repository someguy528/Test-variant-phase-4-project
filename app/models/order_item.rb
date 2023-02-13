class OrderItem < ApplicationRecord
    belongs_to :product
    belongs_to :order
    validates :product_id, :order_id, :quantity, presence: true
end
