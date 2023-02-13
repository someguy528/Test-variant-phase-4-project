class Api::OrdersController < ApplicationController
    def create
        order = Order.create!(order_params)
        render json: order
    end
    def index 
        orders = Order.all 
        render json: orders
    end
    def show
        order = Order.find(params[:id])
        render json: order 
    end
    def destroy 
        order = Order.find(params[:id])
        order.destroy
        head :no_content
    end
    private
    def order_params
        params.permit(:buyer_id, :status, :delivery_date, :price_total)
    end
end
