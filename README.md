# Welcome to [BressOne](https://github.com/BressOne)/**[nguru_test](https://github.com/BressOne/nguru_test)**!

[![BressOne](https://circleci.com/gh/BressOne/nguru_test.svg?style=shield)](https://github.com/BressOne/nguru_test)
This is test task performed by me during screening from [NetGuru](https://www.netguru.com/) 

  

## Shortcut: Deployed working example

Use [https://nguru.herokuapp.com/](https://nguru.herokuapp.com/) to play around.

# Setup

Start from

    git clone https://github.com/BressOne/nguru_test.git

than

    npm install
 
 Than go to ./config.js Take a look on config vars:

    loglevel: [ERROR, WARN, LOG, DEBUG] // switches between logging level of the server
    port: Number // port number for the server
    host: String // self of the server host with protocol
    mongoDB:{
	    host: String // used MondgoDB host name
	    port: Number // port number for the MondgoDB  server
	    username: String // MondgoDB user name
	    password: String // MondgoDB user password
	    dbName: String // MondgoDB db to work with
    }
    contentProvider:{
	    apiKey: String // apikey of the movieDB service. http://www.omdbapi.com/ and follow instructions
	    host: String // host of the movieDB service. Is http://www.omdbapi.com/ itself
    }
    pagination:{
	    pageSize: Number //pagesize for paginated requests, e.g. /movies
    }
You need to pass all config cars in order to run the server correctly. If you are going to deploy on eny env, make sure you passed all env vars right. Keys are represented in the file too.
Now we are ready to use

    npm run start

In order to use nodemon, use: 

    npm run dev
    
  Format and lint scripts are also on board.

## Routes

### GET /
Basic dummy route. Nothing to use there.

### POST /movie
Post body with set of fields to store them in DB. the 'Title' field is required and will be used to find missing data on third party movieDB. Anyway, request fields are in higher order when it comes to saving movie in our db. You can override data that way.
Schema of the body is at its maximum:

    {"Title":"Blade","Year":"1998","Rated":"R","Released":"21 Aug 1998","Runtime":"120 min","Genre":"Action, Horror, Sci-Fi","Director":"Stephen Norrington","Writer":"David S. Goyer","Actors":"Wesley Snipes, Stephen Dorff, Kris Kristofferson, N'Bushe Wright","Plot":"A half-vampire, half-mortal man becomes a protector of the mortal race, while slaying evil vampires.","Language":"English, Russian, Serbian","Country":"USA","Awards":"5 wins & 10 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BOTk2NDNjZWQtMGY0Mi00YTY2LWE5MzctMGRhZmNlYzljYTg5XkEyXkFqcGdeQXVyMTAyNjg4NjE0._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.1/10"},{"Source":"Rotten Tomatoes","Value":"55%"},{"Source":"Metacritic","Value":"45/100"}],"Metascore":"45","imdbRating":"7.1","imdbVotes":"239,291","imdbID":"tt0120611","Type":"movie","DVD":"22 Dec 1998","BoxOffice":"N/A","Production":"New Line Cinema","Website":"N/A","Response":"True"}
The responce is in same schema but will have id in addition.

### GET /movie?title=String&id=String
Try to find moovie, stored in our DB. There are two options for quering: by title or by id (POST /movie returns id, remember?). You can try using both criteria, but id is in prior, remember that.
Schema of returned doc is same as in POST /movie. Missing both parameters is error 400. Be aware.

### GET /movies?page=Number
List all movies, stored in our db. `page` is optional and defaults to 1. Responce schema is:

    {
	    data: [Movie] // array of movies with same responce schema as POST /movie has
	    pagination: {
		    totalUnits: Number, //total count of items in DB
		    currentPage:  Number, //current page
		    totalPages:  Number, //total pages
	    }
    }

### POST /comment?reference=String&text=String
Post a comment to existing movie in our DB. `reference` parameter is for title or id of movie, `text` stays for comment text. Missing both or one parameter is error 400, If movie is not in our DB it is 404 error.

### GET /comments?page=Number
Does the same stuff the GET /movies does but with comments

## Happy use!
Feel free lo contact me in any caces!
