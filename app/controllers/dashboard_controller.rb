class DashboardController < ApplicationController
  def show
    render file: 'public/dist/index.html', status: 200, layout: false
  end
end
