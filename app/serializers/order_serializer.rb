class OrderSerializer < ActiveModel::Serializer
  attributes :id, :status, :delivery_date, :buyer_id, :price_total
end
