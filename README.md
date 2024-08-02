PROPERTY LISTING DEMO:
This is a sample application that demonstrates an Property-Listing website using the MERN stack. The application loads products from a MongoDB database and displays them. Users can select to display products in a single category. Users can click on any product to get more information including pricing, description. Users can select items and add them to their shopping cart.

INSTALLATION DEMO:
Install nodejs and npm on your device.
Clone the repository to your local system.
In the root folder, create a '.env' file.
Create a MongoDB server and get the MongoDB URI.
Add env variables as "MONGO_URL" to the .env file
Add a PORT variable and JWT_SECRET variable too.
Set PORT = 8080
Set JWT_SECRET as a string of your choice.

STEPS TO RUN THE PROJECT:
Open up the command terminal from the root directory and type npm run dev to start the front end and backend server concurrently.
The application would be run on http://127.0.0.1:8080/

An admin user will be created in the database
Email : admin@admin.com
Password: 123456

LIST OF IMPLEMENTED FEATURES:
Register and Login User
Two Different roles like Admin and User.
List of categories with ability to add and delete category for the admin
List of Users with their information
Admin can change allowed categories for each user and handle their roles and status.
User Dashboard where a user can see the categories he can write about and the gyans he has already wrote.
Filtering based on category,pricing and Number of BHK

TECH STACK USED:
ReactJS
Node.js
Express.js
Bootstrap
MongoDB
