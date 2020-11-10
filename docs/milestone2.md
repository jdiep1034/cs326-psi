# Breakdown of Work
### Andrew Leger:
    Figured out with Justin most of the API stuff we needed (part 0).
    Setup the server functionality: 
        Setup js express, made a package.json (since we apparently didn't have one yet)
        Setup API endpoints for get requests and post requests
        Organized file structure for project
		Setup faker for mostly random fake data responses
    Made a TODO page and a Server Start guide "HOWTO"
	Setup the project on Heroku

### Justin:

### Long:

# Part 0 API planning


Database:
	Stores:
		Keyboard parts Information:
			A circuit board (also called a PCB)
			Keyboard switches
			Keycaps
			Stabilizers
			Case and backplate
			USB cable
		
		User Login Information (User ID, createdAt, user handle, email)
		User preferences/parts they chose (IE: Store the partlist for the build)
		For now, it will use faker to get pseudo data (email, product,userName) from faker.js
		

API:
	Server:
		File Serving:
			Fetch all files required for site running
			
		Get Requests:
			Display/filter different keyboard parts. IE: Press a button "switches", get a list of keyboard switches
			Retrieve current build data
			Retrieve user info
			Retrieve comment data

		Post Requests:
			Save builds server side per user
			Save comments to serve to all users on site load
			Save wishlist 
			// Keyboard data is probably retrieved through other means?

# Part 1: Back-end Skeleton Code IE: The server
Server responds to API endpoints and sends random data in a json blob back to the client to generate text that populates
the browsing page parts table and profile page builds table and profile info.

GET Endpoints:
	'/': Serves the Browsing page at root level as its the homepage

	'/switches': Just a junk testing endpoint
	
	'/userParts': Sends array of json objects for profile page. 

	'/caseProducts'

	'/pcbProducts'

	'/keySwitchProducts'

	'/keyCapProducts'

	'/cableProducts'

	All the above send the same response of randomly generated json blobs. These will retrieve their respective tables when we implement databases.

	'/userInfo': Generates json for populating a random user profile

POST Endpoints:
	'/updateParts': For now, just sends a "response receieved" message. We have no need to store data before getting a dbms set up
# Part 2: Front-End Implementation

# Part 3: Deployment
https://psi-326.herokuapp.com/