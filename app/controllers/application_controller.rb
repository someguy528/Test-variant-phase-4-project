class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordInvalid, with: :rescue_invalid
    before_action :authorize
    private
    def rescue_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
    def authorize 
        @user = User.find_by(id: session[:user_id])
        return render json: {errors: ["Unauthorized Access"]}, status: :unauthorized unless @user
    end

end
