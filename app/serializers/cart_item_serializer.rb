class CartItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :product_id, :cart_id
  # belongs_to :cart
  belongs_to :product
end
