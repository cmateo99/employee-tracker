Employee Tracker
This command-line application allows you to manage a company's employee database. It is built using Node.js, Inquirer, and MySQL. With this application, you can view and manage departments, roles, and employees in your company.

Installation
To use this application, follow these steps:

Clone the repository from GitHub.
Run npm install to install the required dependencies.
Enter the database info if yours is different than the one listed
DB_NAME: The name of your MySQL database.
DB_USER: Your MySQL username.
DB_PASSWORD: Your MySQL password.
Create the database schema by running the schema.sql file located in the db folder.
Seed the database with test data in the seed folder.
Start the app by running node index.js in the terminal.

Usage
Upon starting the application, you will be presented with a menu of options:

View all departments
View all roles
View all employees
Add a department
Add a role
Add an employee
Update an employee role
Exit

Technologies Used

Node.js
Inquirer
MySQL

License
This project is licensed under the MIT License.