before do 
	response.headers['Access-Control-Allow-Origin'] = '*'
end

get '/*' do 
	erb :index
end
