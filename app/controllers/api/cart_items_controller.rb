class Api::CartItemsController < ApplicationController
    def create
        cart = @user.carts.find_by(status: "open")
        unless cart.cart_items.find_by(product_id: params[:product_id])
            cart_item = cart.cart_items.create!(cart_item_params)
            cart.price_total_update
            render json: cart_item, status: :created
        else
            # render json: {errors: ["Item is already in Cart!"]}, status: :unauthorized
            cart_item = cart.cart_items.find_by(product_id: params[:product_id])
            cart_item.update(quantity: cart_item[:quantity] + params[:quantity])
            cart.price_total_update
            render json: cart_item
        end
    end
    private
    def cart_item_params
        params.permit(:product_id, :quantity)
    end
end
