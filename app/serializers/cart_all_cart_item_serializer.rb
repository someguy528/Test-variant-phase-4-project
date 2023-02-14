class CartAllCartItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :cart_id
  belongs_to :cart
  belongs_to :product
end
