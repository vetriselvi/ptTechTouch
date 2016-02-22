class MusesController < ApplicationController

  respond_to :json
  skip_before_filter :verify_authenticity_token  

  def index
    @muse = Muse.first
    @patients = Patient.all
    @muse.beforetime = @muse.startime
    @muse.startime = Time.now.to_i*10
    @muse.save!
  end

  def data
    @muse = Muse.first
    @firsttime = @muse.startime
    @secondtime = @muse.currtime
    @rangeofmotion = @muse.currtime-@muse.prevtime
    @patient = Patient.new
    @patient.rangeofmotion = @rangeofmotion/10
    @patient.save!
    @patients = Patient.all
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
        @muse.counter = 0
        @muse.save!
        respond_with(@muse)
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
