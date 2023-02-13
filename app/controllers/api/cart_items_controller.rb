class Api::CartItemsController < ApplicationController
    def create
        cart = @user.carts.find_by(status: "open")
        unless cart.cart_items.find_by(product_id: params[:product_id])
            cart_item = cart.cart_items.create!(cart_item_params)
            # cart.price_total_update
            cart_item.price_add_to_cart
            render json: cart_item, status: :created
        else
            # render json: {errors: ["Item is already in Cart!"]}, status: :unauthorized
            cart_item = cart.cart_items.find_by(product_id: params[:product_id])
            cart_item.update!(quantity: cart_item[:quantity] + params[:quantity])
            cart_item.price_add_additional_item_quantity(added_quantity: params[:quantity])
            render json: cart_item
        end
    end
    def update
        cart_item = CartItem.find_by(id: params[:id])
        if cart_item.quantity != params[:quantity]
            old_quantity = cart_item.quantity
            cart_item.update!(cart_item_update_params)
            cart_item.cart_price_change(new_quantity: params[:quantity], old_quantity: old_quantity)
            render json: cart_item, include: ["product" , "product.seller"]
        else
            render json: {errors: ["Quantity did not change!"]}, status: :unauthorized
        end
    end
    def destroy
        cart_item = CartItem.find_by(id: params[:id])
        if cart_item
            cart_item.price_subtract_to_cart
            cart_item.destroy
            head :no_content
        else
            render json: {errors: ["Cart Item Not Found!"]}, status: :not_found
        end
    end
    private
    def cart_item_params
        params.permit(:product_id, :quantity)
    end
    def cart_item_update_params
        params.permit(:quantity)
    end
end
