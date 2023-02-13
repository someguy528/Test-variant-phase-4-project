class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :available, :seller_id
  belongs_to :seller
end
