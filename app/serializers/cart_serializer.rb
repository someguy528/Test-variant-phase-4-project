class CartSerializer < ActiveModel::Serializer
  attributes :id, :status, :price_total, :buyer_id
  has_many :cart_items, serializer: CartAllCartItemSerializer
end
