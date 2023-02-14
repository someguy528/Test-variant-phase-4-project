class CartItem < ApplicationRecord
    belongs_to :product
    belongs_to :cart
    validates :product_id, :cart_id, :quantity, presence: true
    validates :quantity, numericality: { greater_than: 0, less_than: 11 }

    def price_add_to_cart
        self.cart.update(price_total: self.cart.price_total + (self.quantity * self.product.price) )
    end

    def price_subtract_to_cart
        self.cart.update!(price_total: self.cart.price_total - (self.quantity * self.product.price))
    end

    def price_add_additional_item_quantity(added_quantity:)
        self.cart.update!(price_total: self.cart.price_total + (added_quantity * self.product.price) )
    end

    def price_cart_change(new_quantity:, old_quantity:)
        changed_quantity =  new_quantity - old_quantity
        self.cart.update!(price_total: self.cart.price_total + (changed_quantity * self.product.price))
    end

end
