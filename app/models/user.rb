class User < ApplicationRecord
    has_secure_password
    has_many :products, foreign_key: :seller_id
    has_many :orders, foreign_key: :buyer_id
    has_many :order_items, through: :orders
    has_many :carts, foreign_key: :buyer_id
    has_many :cart_items, through: :carts
    validates :username, :name, :password, :password_confirmation, :name, presence: true
    validates :username, uniqueness: {scope: :username}, length: {in: 4..20, message: "is 4-20 characters" }, format: { with: /\A[a-zA-Z\d]{4,20}\z/, message: "can only consists of letters and numbers" }
    validates :name, format: { with: /\A[a-zA-Z]+\z/, message: "can only consists of letters" }, length: {in: 4..20, message: "is 4-20 characters"}
    validates :password, length: {in: 6..25, message: "is 6-25 characters"}, format: { with: /\A(?=.*[a-zA-Z])(?=.*[\d]).{6,25}\z/ , message: "can only consist of non-space characters, must have a number and letter"}
end

# securepassword variant
# /\A(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W]).{6,25}\z/ 