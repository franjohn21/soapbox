

APP_ID = ENV['APP_ID']
APP_SECRET = ENV['APP_SECRET']
REDIRECT_URI = 'http://localhost:9393'
#REDIRECT_URI = 'http://soap-box.herokuapp.com'
#Leave above URL for heroku



#Show all of your splashes, or show login page
#if you are not logged in

before do
  current_user
end

get '/' do
  if current_user
    @splashes = @current_user.splashes.order('created_at').reverse
    erb :index
  else
    erb :login
  end
end

#Get all of your splashes
get '/splashes' do
  if current_user
    @current_user.latitude = params[:lat]
    @current_user.longitude = params[:lon]
    @current_user.save!
  end
  old_splashes = UserSplash.where("created_at <= ?", Time.now - 2.hours)
  old_splashes.each {|old| old.destroy}
  @splashes = Splash.all
  countArr = []
  commentsArr = []
  current_user.splashes.order('created_at').each do |splash|
    num = UserSplash.where("splash_id = #{splash.id} AND favorited = true").count
    countArr.push(num)
    commentsArr.push splash.comments
  end
  total_favs = 0
  current_user.splashes_created.each do |splash|
    total_favs = total_favs + UserSplash.where("splash_id = #{splash.id} AND favorited = true").count
  end
  if request.xhr?
    content_type :json
    {:splashes=> current_user.splashes.order('created_at'), :meta=> current_user.user_splashes.order('created_at'), :count => countArr, :total_favs => total_favs, :comments => commentsArr}.to_json
  else
    redirect '/'
  end
end

get '/splashes/:id/favorite' do
  puts params[:id]
  usersplash = UserSplash.find_by(:splash_id => params[:id], :user_id => current_user.id)
  usersplash.favorited = !usersplash.favorited
  usersplash.save!
  content_type :json
  usersplash.to_json
end

get '/splashes/:id/comments' do
  content_type :json
  Comment.find_by(:splash_id => params[:id].to_i).to_json
end

post '/splashes/:id/comment' do
  splash = Splash.find(params[:id])
  comment = Comment.create(:content => params[:content])
  current_user.comments << comment
  splash.comments << comment
  if request.xhr?
    content_type :json
    comment.to_json
  else
    redirect '/'
  end
end

post '/splashes' do
  splash = Splash.create(:content => params[:content])
  current_user.splashes_created << splash
  current_user.splashes << splash
  if request.xhr?
    content_type :json
    {:splashes=> splash, :meta=> UserSplash.find_by(:splash_id => splash.id, :user_id => current_user.id), :count => splash.comments.length}.to_json
  else
    redirect '/'
  end
end

get '/auth/facebook/callback' do

  auth = request.env['omniauth.auth']
  facebook_id = auth['uid']
  session[:user_id] = facebook_id
  user = User.find_by(:fb_user_id => facebook_id)

  if user
    user.token = auth['credentials'].token
    user.save
  else
    User.create(:fb_user_id => facebook_id, :token =>  auth['credentials'].token, :first_name => auth['extra']['raw_info'].first_name, :last_name => auth['extra']['raw_info'].last_name)
  end
  redirect to '/'
end

get '/auth/failure' do
  flash[:notice] = params[:message] # if using sinatra-flash or rack-flash
  redirect '/'
end

get '/user' do
  content_type :json
  current_user.to_json
end

get '/logout' do
  session[:user_id] = nil
  redirect '/'
end
