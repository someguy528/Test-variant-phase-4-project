class Api::CartsController < ApplicationController

    def show 
        cart = @user.carts.find_by(status: "open")
        if !cart
            cart = @user.carts.create!(new_cart_hash)
        end
        render json: cart, include: ["cart_items" , "cart_items.product", "cart_items.product.seller"]
    end
    def destroy
        cart = @user.carts.find_by(status: "open")
        cart.destroy
        @user.carts.create!(new_cart_hash)
        head :no_content
    end

    private

    def new_cart_create
        params.permit(:status, :price_total)
    end
    def new_cart_hash
        {buyer_id: @user.id, status: "open", price_total: "0.00" }
    end
    

end
