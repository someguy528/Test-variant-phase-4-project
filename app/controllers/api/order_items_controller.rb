class Api::OrderItemsController < ApplicationController
    def create 
        product = Product.find(params[:product_id])
        if product.available == true
            item = OrderItem.create(item_params)
            item.order.price_total_update
            render json: item
        else
            render json: {errors: ["Product is unavailable"]}, status: :unauthorized
        end
    end
    def index 
        items = OrderItem.all
        render json: items
    end
    def show
        item = OrderItem.find(params[:id])
        render json: item
    end
    def update
        item = OrderItem.find(params[:id])
        if params[:quantity] != item.quantity
            item.update(quantity: params[:quantity])
            item.order.price_total_update
        end
        render json: item
    end
    def destroy
        item = OrderItem.find(params[:id])
        order = item.order
        item.destroy
        order.price_total_update
        head :no_content     
    end

    private
    def item_params
        params.permit(:product_id, :order_id, :quantity)
    end
end
