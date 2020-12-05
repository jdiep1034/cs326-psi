# Psi-group Project Fall 2020

## Mechanical Keyboard Part Picker

### **Team Members:**

Andrew Leger

Justin Diep

Long Vo


# Overview



# Breakdown of Work (Whole Project)
### Andrew Leger:

Summary:

    With the exception of milestone 1 which was mostly the "looks" of the webpage, I did mostly backend stuff (server setup/ server endpoints/ SQL Database management/ ) etc. Then at the end of milestone 3 all 3 of us came together to finish "hooking everything up". IE: Connecting all the different parts of the project so the site actually did what we wanted.

    Basic work strategy overall for me was: Write server/database code, commit to my branch then merge to master, tell Justin to do some stuff. Justin does stuff, tells me what else he needs that I didn't think of, I add it in. Repeat.

    Basically me and Justin flip flopped between tasks we would assign each other while Long worked more alone (since he's in a different time zone) on his own parts of the project. I'd say it was a pretty even split of work overall. For specifics of each Milestone, I copied from the previous documents below.

Milestone 1:

    Drew all the wireframes while discussing with partners

    Completed the profile page.

    Modified the template page that Justin wrote most of, fixing bugs and rearranging some stuff. 
    Specifically: Moved body tag to end where it should be, took the center three columns out of the footer class (it shouldn't be a footer, but a row of a container), made the body tag not a container, but put a conatiner inside the body withing its own div, added a footer with bottom positioning that looks pretty. Made and added support for styles.css file, Added comments

Milestone 2:

    Figured out with Justin most of the API stuff we needed (part 0).
    Setup the server functionality: 
    Setup js express, made a package.json (since we apparently didn't have one yet)
    Setup API endpoints for get requests and post requests
    Organized file structure for project
    Setup faker for mostly random fake data responses
    Made a TODO page and a Server Start guide "HOWTO"
    Setup the project on Herok

Milestone 3:

    Planned the milestone with the other 2
    Did almost all the SQL stuff. Including setting up the database and writing almost all the code in dbmanagament.js
    Did almost all the updated server endpoints for retrieving sql information
    Did about half the login stuff, Long did the other half.
    Made the profile page work.
    Cleaned up a bunch of code
    Slightly modified client-side browsepage code, mostly to have it send extra data that the server endpoints needed for tasks.
    Styled the login and register pages.

Final:
    Wrote most of this file.

### Long Vo

Milestone 1:

	Helped with discussion of wireframe with the other 2
	Completed social page (In idea it had similar structure to when you open a thread in slack but as of today, social page is deemed unecessary and depracated
	Helped with other pages
	
Milestone 2:

	Reworked social page html and setup to dynamically get  "comments" (at this point it's not connected to any database so it's dummy data)
	Set up get endpoints
	Worked on social.js
	Deploy to heroku
	
Milestone 3:

	Helped write the majority of planning for part 3.
	Implemented login and logout functionality 
	Add authentication so that if a user is not logged in, he/she can't see the website
	Set up endpoints for login and logout and connect them to database table (profiles)
	Edited info, browsing page to get data from profiles table
	Added register user functionality and it's endpoint (INSERT into profiles table)

# User Interface

# APIs

Login system works as done in the class exercise. Though the pages themselves look prettier.

GET ENDPOINTS:


/profilePage.html

/profile.js

These two files are now served privately since they require user login to access.

/insertBuild

Inserts the global variable builds into the builds table. Is called client side after ensuring global variable is properly set (and also has checking to ensure its set)
Only works when logged in

/removePart

Deletes the *build* (Yes, we know it says remove part) for the current user from the builds table. Retrieves the buildID from global user object. 

/userparts

Retrieves relevant data for the profile page's build table. IE: For actually displaying all the parts you choose for your build.
It does this by querying the builds table for all the relevant part ids for each part of the current user's build. Then querying each part table for the relevant information and sending it to the client.

/pcbProducts

Retrieves all pcbs for display on the browsing page

/caseProducts

Retreives all cases compatible with the chosen pcb. Client enforces this is called after /pcbProducts sets a variable this needs.

/keySwitchProducts

Same as above, but for the switches table

/keyCapProducts

Retrieves all keycaps. Our small dataset  all keycaps compatible with all switches as non-compatible keycaps are very rare.

/cableProducts

Retreives all cables. Cables are all compatible.

/userInfo

User data to be retreived on the profile page.

/

Root directory now serves the login page by default

/login

Takes you to login page. Same as exercise

/logout

Logs you out

/register

sends register.html page

POST ENDPOINTS:

/updateParts

Updates a global variable build which stores relevant data to later be inserted into the builds table

/login

On succesful login, redirects to profilepage.html
on fail, redirects to /login

/register

Registers a user. Same as exercise but with a proper database. 

# Database Overview

	Commands used for table creation:
	CREATE TABLE PCBs (itemID int, image varchar(500), partname varchar(150), partdescription varchar(500), PCB_size int, switch_type varchar(30), price decimal, purchase_link varchar(500)); 
	CREATE TABLE Cases (itemID int, image varchar(500), partname varchar(150), partdescription varchar(500), PCB_size int, price decimal, purchase_link varchar(500)); 
	CREATE TABLE Switches (itemID int, image varchar(500), partname varchar(150), partdescription varchar(500), switch_type varchar(30), price decimal, purchase_link varchar(500)); 
	CREATE TABLE KeyCaps (itemID int, image varchar(500), partname varchar(150), partdescription varchar(500),  price decimal, purchase_link varchar(500));
	CREATE TABLE Cables (itemID int, image varchar(500), partname varchar(150), partdescription varchar(500), price decimal, purchase_link varchar(500));
	
	CREATE TABLE profiles (email varchar(200) unique not null, username varchar(100) UNIQUE NOT NULL, buildID SERIAL PRIMARY KEY, hashedpwd varchar(300), salt varchar(300));
	CREATE TABLE Builds (buildID int PRIMARY KEY REFERENCES profiles(buildID), pcbPartID int, casePartID int, switchPartID int, keyCapPartID int, cablePartid int);

PCBs table
| Column Name     | Data Type    | Description                                                                               |
|-----------------|--------------|-------------------------------------------------------------------------------------------|
| itemID          | int          | ID attribute of the pcb part                                                              |
| image           | varchar(500) | Link to image of the part                                                                 |
| partname        | varchar(150) | Name of part                                                                              |
| partdescription | varchar(500) | Description of part                                                                       |
| pcb_size        | int          | The size of the pcb, which is relevant for determining compatibility with different cases |
| switch_type     | varchar(30)  | The type of switch supported by the pcb. Determines compatible switches                   |
| price           | decimal      | The price of the table                                                                    |
| purchase_link   | varchar(500) | Link to site where the part can be purchased                                              |

Cases Table
| Column Name     | Data Type    | Description                                                                               |
|-----------------|--------------|-------------------------------------------------------------------------------------------|
| itemID          | int          | ID attribute of the pcb part                                                              |
| image           | varchar(500) | Link to image of the part                                                                 |
| partname        | varchar(150) | Name of part                                                                              |
| partdescription | varchar(500) | Description of part                                                                       |
| pcb_size        | int          | The size of the case, which is relevant for determining compatibility with different pcbs |
| price           | decimal      | The price of the table                                                                    |
| purchase_link   | varchar(500) | Link to site where the part can be purchased                                              |

Switches table

| Column Name     | Data Type    | Description                                                                               |
|-----------------|--------------|-------------------------------------------------------------------------------------------|
| itemID          | int          | ID attribute of the pcb part                                                              |
| image           | varchar(500) | Link to image of the part                                                                 |
| partname        | varchar(150) | Name of part                                                                              |
| partdescription | varchar(500) | Description of part                                                                       |
| switch_type     | varchar(30)  | The type of switch. Determines compatiblility with pcbs              |
| price           | decimal      | The price of the table                                                                    |
| purchase_link   | varchar(500) | Link to site where the part can be purchased                                              |

Keycaps table

| Column Name     | Data Type    | Description                                                                               |
|-----------------|--------------|-------------------------------------------------------------------------------------------|
| itemID          | int          | ID attribute of the pcb part                                                              |
| image           | varchar(500) | Link to image of the part                                                                 |
| partname        | varchar(150) | Name of part                                                                              |
| partdescription | varchar(500) | Description of part                                                                       |
| price           | decimal      | The price of the table                                                                    |
| purchase_link   | varchar(500) | Link to site where the part can be purchased                                              |

Cables table

| Column Name     | Data Type    | Description                                                                               |
|-----------------|--------------|-------------------------------------------------------------------------------------------|
| itemID          | int          | ID attribute of the pcb part                                                              |
| image           | varchar(500) | Link to image of the part                                                                 |
| partname        | varchar(150) | Name of part                                                                              |
| partdescription | varchar(500) | Description of part                                                                       |
| price           | decimal      | The price of the table                                                                    |
| purchase_link   | varchar(500) | Link to site where the part can be purchased                                              |

Profiles table:
| Column Name | Data Type                    | Description                                                                                                                                          |
|-------------|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| email       | varchar(200) UNIQUE NOT NULL | Email for the user. Must be unique and set.                                                                                                          |
| username    | varchar(100) UNIQUE NOT NULL | Username for the user. Must be unique and set.                                                                                                       |
| buildID     | SERIAL PRIMARY KEY           | The id of the user's build. To be used for lookup in the builds table. Auto increments starting at 1 on insertion to ensure every buildID is unique. |
| hashedpwd   | varchar(300)                 | The hashed password + salt of the user, generated with minicrypt.js                                                                                  |
| salt        | varchar(300)                 | The salt of the user, generated with minicrypt.js                                                                                                    |

Builds table:
| Column Name  | Data Type                                    | Description                                                                          |
|--------------|----------------------------------------------|--------------------------------------------------------------------------------------|
| buildID      | int PRIMARY KEY REFERENCES profiles(buildID) | The build ID to store the build of the user. References profiles table's primary key |
| pcbPartID    | int                                          | id from the pcbs table. To be used for easy lookup of the full part.                 |
| casePartID   | int                                          | Same as above for cases table                                                        |
| switchPartId | int                                          | Same as above for switches table                                                     |
| keyCapPartId | int                                          | Same as above for keycaps table                                                      |
| cablePartId  | int                                          | Same as above for cables table                                                       |

# URL Routes/Mappings

HomePage: https://psi-326.herokuapp.com/

The homepage by default redirects to login if the user is not logged in, and otherwise redirects to the part building page

Part Building page: https://psi-326.herokuapp.com/BrowsePage.html

The Build page is where you design your mechanical keyboard. The page first directs you to select a PCB for the keyboard which determines which parts are compatible for the rest of the keyboard. Then, in order, you select a case, a key switch, a key cap, and finally a cable. Depending on what you chose as a PCB, different options will be available from the cases and key switches tables that are delivered to the client, so the client can only pick compatible parts. After completing the build, you can click to save the current build to your profile.

Info Page: https://psi-326.herokuapp.com/InfoPage.html

A basic information page about what mechnical keyboards are and other relevant information you'll need when choosing parts. Also contains links to other learning resources.

Login Page: https://psi-326.herokuapp.com/login.html

Exactly as it says on the box, you log in here. If you don't have an account, you can click to register

Account Registration page: https://psi-326.herokuapp.com/register.html

Make an account here so you can log in to the site and save builds you design.

Profile Page: https://psi-326.herokuapp.com/profilePage.html

This is where you can view your account information, including the build you currently have saved to the account. Since builds are currently stored server side with a unique build ID that must be matched by a user account, you MUST have an account to save a build. 

# Authentication
	For authenticated we used the passport library and set it up so that if someone's not logged in, he she can't access the website at all.

# Conclusion
