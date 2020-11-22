# Breakdown of Work
### Andrew Leger:
    Planned the milestone with the other 2
    Did almost all the SQL stuff. Including setting up the database and writing almost all the code in dbmanagament.js
    Did almost all the updated server endpoints for retrieving sql information
    Did about half the login stuff, Long did the other half.
    Made the profile page work.
    Cleaned up a bunch of code
    Slightly modified client-side browsepage code, mostly to have it send extra data that the server endpoints needed for tasks.
    Styled the login and register pages.

### Justin:
	Helped plan how the user would interact and navigate through the build page.
    Gathered data (img url, item name, item description, item type, item price, page url) for all parts stored in database.
    Researched info for completion of Guide Page.
        edited infopage.html and inserted gathered info.
    Implemented front-end of Build page 
        modified browsingpage.html and browsing.js so user begins build by clicking a button then continues through the
        process of making their own build by selecting a part and continuing.

### Long:
	


# Part 1: Database Implementation
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
| pcb_size        | int          | The size of the pcb, which is relevant for determining compatibility with different pcbs  |
| price           | decimal      | The price of the table                                                                    |
| purchase_link   | varchar(500) | Link to site where the part can be purchased                                              |

Switches table

| Column Name     | Data Type    | Description                                                                               |
|-----------------|--------------|-------------------------------------------------------------------------------------------|
| itemID          | int          | ID attribute of the pcb part                                                              |
| image           | varchar(500) | Link to image of the part                                                                 |
| partname        | varchar(150) | Name of part                                                                              |
| partdescription | varchar(500) | Description of part                                                                       |
| switch_type     | varchar(30)  | The type of switch supported by the pcb. Determines compatible pcbs                       |
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

# Part 2: Back-end Functionality


# Part 3: Deployment
https://psi-326.herokuapp.com/
