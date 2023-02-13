class Product < ApplicationRecord
    belongs_to :seller, class_name: 'User', foreign_key: :seller_id, required: true
    has_many :order_items
    has_many :cart_items
    has_many :carts, through: :cart_items 
    validates :seller_id, :name, :description, :price, presence: true
    validates :name, length: {in: 4..30}, format: {with: /\A[a-zA-Z\d]+([:]{0,1}[ \-]{1}[a-zA-Z\d]+)*\z/}
    validates :description, length: {in: 5..50}, format: {with: /\A[a-zA-Z\d]+(([:\,]{0,1}[ \-]{1}[a-zA-Z\d]+)*[.!\?]{0,1})*\z/}
    validates :price,  numericality: { greater_than: 0.00, less_than: 200.00 }, format: {with: /\A[\d]+(([\.]{1}[\d]{1,2})|([\.]{0}))\z/}
end

# description new regex
# /\A[a-zA-Z\d]+(([:\,]{0,1}[ \-]{1}[a-zA-Z\d]+)*[.!\?]{0,1})*\z/
# description old regex
# /\A[a-zA-Z\d]+[a-zA-Z\d .,:@$#&!?]*\z/

# price validation old
# /\A[\d]+[\.]{0,1}[\d]{1,2}\z/

# price validation new
# /\A[\d]+(([\.]{1}[\d]{2})|([\.]{0}))\z/