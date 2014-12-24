before do 
	response.headers['Access-Control-Allow-Origin'] = '*'
end

get '/' do 
	erb :index
end

get '/splashes' do
	erb :_splashes
end