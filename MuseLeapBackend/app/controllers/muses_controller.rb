class MusesController < ApplicationController

  respond_to :json
  skip_before_filter :verify_authenticity_token  

  def index
    @muse = Muse.first
    @muse.beforetime = @muse.startime
    @muse.startime = Time.now.to_i*10
    @muse.save!
  end

  def show 
    @muse = Muse.first
    respond_with(@muse)
  end

  def update
    @muse = Muse.find(params[:id]) 
    prevState = @muse.state
    @muse.update_attributes(muses_params)
    @muse.save!
    if @muse.state != prevState && @muse.state == 1
      puts "BLINKED"
      @muse.prevtime = @muse.currtime
      @muse.currtime = Time.now.to_i*10
      @muse.save!
      if @muse.counter == 2
        puts "BlINKED TWICE"
        redirect_to '/muses/index'
        @muse.counter = 0
        @muse.save!
      else
        respond_with(@muse)
      end
      @muse.counter += 1
      @muse.save!
    else
      respond_with(@muse) 
    end
  end

  def muses_params
    params.permit(:state, :id)
  end

end
