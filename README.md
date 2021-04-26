# Fullstack Web Development 

# **Tea Empire**
## Context
This project aims to create a full-stack application which incorporate the following features: ORM, database migrations, form helpers/validations, user authentication and routing. 

As a **developer** the objectives of this project are (Site owner's goal):
* Create a full-stack application.
* Create an online payment and integrate a third-party payment gateway. (Stripe)
* Have content or features that are accessible only by authorized users.
* Create a single page application using React Hooks and use HTTP requests to consume endpoints written specifically for it. 

This application serve the following purpose (User's Goal):
* Allow users to search, read and purchase high-grade tea.
* Vendor to conduct CRUD on tea and orders.



## Access
Url to live (Consumer) site: https://sleepy-sammet-de2185.netlify.app/

Url to live (Vendor) site: https://gys-tgc11-tea-empire.herokuapp.com/

Take note that heroku will take up to 30 seconds to load. 


# Defining the Project
The purpose of this website is to build a fullstack application that allow users to read and purchase tea. For vendor to conduct CRUD on the listed tea and orders. 


Tea Empire aims to provide a platform for tea enthusiast aged 20-50 to read, compare and purchase high-grade tea across different brands. 


# Strategy
## Identifying External Users
With the primary purpose mentioned above, the website has two primary users. 

1. Customers visiting the website to read and purchase tea.
2. Vendors managing teas and orders in the admin panel. 

## Identifying External Users' Goals
The users' goal here is to get the neccessary information related to the tea. 

Therefore, the interface should be simple to understand and easy to interact with.  

```
EUG01. See all tea.
EUG02. Find out if a tea exist in the database.
EUG03. See key information of the selected tea, such as ingredients, price and steeping instructions. 
EUG04. Add tea to cart. 
EUG05. Checkout item from cart. 
EUG06. See all orders.
EUG07. See individual order.
EUG08. Register for an account.
EUG09. Edit account details.
```

## Identifying Users Pain Point
Typical tea store will focus on the taste of the tea. However most user does not know how to bring out the taste of the tea to the fullest. Therefore the page aims to provide guide to customers on the steeping instructions

``` 
UPP01. Unsure how to steep the tea. 
``` 

## Identifying Site Owner's Goals
My goal as the site owner is to showcase my proficiency in React Hook, MySql, Express and Nodejs.  

```
SOG1. Showcase my proficiency in React Hook, MySql, Express and Nodejs. 
SOG2. Integrate other features such as: ORM, database migration, form helpers/validation, image uploader, user authentication and routing.
SOG3. Integrate a Stripe as the third-party payment gateway.
SOG4. Provide a platform to solve users pain point 
```

## User stories 
```
US01. As a user, I want to look at all the tea, so that I know what are avaiable.
US02. As a user, I want to search for a tea, so that I know if it exist in the database.
US03. As a user, I want to see the details of the tea, so that I know if this is a tea that I want. 
US04. As a user, I want to know buy the tea, so that I can enjoy the tea. 
US05. As a user, I want to add the tea into my cart, so that I can purchase the item.  
US06. As a user, I want to see all my previous order, so that I can refer to my past purchase. 
US07. As a vendor, I want to create/update/delete the tea, so that tea are kept to date.
US08. As a vendor, I want to all orders made by all customer, so that I can know which orders require handling. 
```

# Scope
## Functional Requirement
```
FR01. Database (MySql) to hold all the information. 
FR02. User can search base on certain key parameters to check if the tea exist. 
FR03. Vendor should be able to create/update/delete tea.
FR04. Private details should be encrypted before storing.
FR05. Navigational bar to toggle between pages. 
FR06. Database relationship must be declared. 
FR07. Cache storage should not store sensitive information. 
``` 

## Non-Functional Requirement
```
NFR01. Ensure readability.
NFR02. Mobile responsive to decides such as Phone, Tablet and Laptop.
```

## Content Requirement
### Mandatory Requirement
The list below contains the mandatory requirement for the site to meet all of the users goals.

```
CRM01. Layout for overview of all tea. (EUG01)
CRM02. Search Filter. (EUG02)
CRM03. Information Table for tea. (Static Data, such as Ingredients, Steeping Instruction, Price, Serving Size) (EUG03)
CRM04. Add to cart function. (EUG04)
CRM05. Integration to stripe for payment checkout. (EUG05)
CRM06. Layout for all orders. 
CRM07. Information Table for orders. (EUG07)
CRM08. Form to register/Edit Account. (EUG08/09)
```

### Optional Requirement
The list below are optional requirements that can be implemented to enhance the site's feature. 

They may not be implemented due to various reasons. (Eg, authorisation, access to system/domains, time)

```
CRO01. User to checkout with specificed item in the cart.
CRO02. Send order as a gift with recipient name and alternate address.
CRO03. Stripe checkout from React.  
``` 

# Structure
## Content Information & Structure
Information that are required to fulfil the mandatory content requirement is presented in the Logical Schema diagram. 

![Content Information & Structure Image](images/logical-schema-diagram.PNG)

# Skeleton
## Interface Design
All page should adopt a similar design for harmony in design. If the functionality of the page is similar, they can share the same interface design layout. 

## Home Page
This page will have an hero image and a CTA to see all tea.

![Skeleton Design for Home Page](images/skeleton-home.png)

## All Teas/Orders Page
This page will focus search and display of the teas and orders. 

![Skeleton Design for All Teas/Orders Page](images/skeleton-all.png)

## Individual Tea/Order Page
This page will focus on showing all the relevant information of the Tea and Order. Order will not have any images.  

![Skeleton Design for Individual Tea/Order Page](images/skeleton-individual.png)

## CRUD Tea Page 
This page will gather input relevant information of the recipe from the vendor. 

![Skeleton Design for Create Tea Page](images/skeleton-crud.png)

## Site Map

![Site Map For Vendor](images/site-map-vendor.png)

![Site Map For Consumer](images/site-map-consumer.png)

## Navigation
Navigation between sites can be done by using the nav bar provided. 


# Surface
## Color
Most of the page is left white. Main purpose of this is to ensure readability and providing good contrast between the background and the images. 

Gold can be seen in the call to action buttons because it is often related to elegant and a feel of high-quality. 

Contrast of grey is used to provide seperation of white spacing. 


## Fonts
[Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond?query=cormorant) font are used for the Brand name and title. It is a hand-drawn Catharsis Font which aim to provide a exquisite and elegant appearance. 

[Lato](https://fonts.google.com/specimen/Lato?query=Lato) font are used to inherit all of the body text in the webpage. 

The font is a sans serif typeface. The semi-rounded details of the letters give Lato a feeling of warmth, while the strong structure provides stability and seriousness. 

## Features

## Form-validation
Apart from third party/technologies mentioned below. I have used conditional rendering and flags to check if form inputs by the user are in the acceptable format. The conditional rendering will show the user which fields are unacceptable and provide context. 


```

# Deployment
Ensured all changes has been save and pushed to GitHub.

If you would like to deploy or fork this application you can visit https://github.com/yongsannnn/TGC-react.  There is only one branch to this application. 

Tea Empire is deployed to Netlify. 

Data sets are store in Heroku and are called automatically. It may take up to thirty seconds for data set to be loaded. 

Apart from React default package. Ensure you have the following depencencies. 
```
axios
bootstrap
react-router-dom
```

## Heroku 
Step 1| Log into Heroku
At the terminal, log in to heroku with:
```
heroku login - i
```

Enter your username and password.


Step 2| Create the Heroku App
Once you have logged in, create a new Heroku app with the following commands at the terminal:
```
heroku create <app-name>
```

Replace app-name with a name of your choice. Do not use underscore. As the app name has to be unique, make sure the name you use is distinctive. You can use your initials as part of the app name, for instance.


Step 3| Define Procfile
The Procfile executes a command when Heroku needs to run our server. Create one in the same directory as index.js and name it as Procfile (the first alphabet must be capitalized, and there is no extension).

Add the following line to the Procfile:
```
web: node index.js
```

Make sure to save the Procfile

Step 4| Add a start script to package.json
```
{
  "name": "06-api-auth",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
. . .
}
```

Step 5| Change the port that we are using

In index.js, change the 3000 in app.listen to process.env.PORT. 

```
app.listen(process.env.PORT, () => {
    console.log("Server has started");
});
```
Step 6| Push to Heroku

Make sure you have a .gitignore file, and it must have node_modules, sessions/ and .env included,
```
git add .
git commit -m "Deploy to Heroku"
git push heroku master
```


Step 7| Setup the Database
We need to use an external database, hosted on an external server, for our project. Heroku itself offers some database hosting services, such as Postgres and ClearDB. We are going with the former for this lab.

In the terminal, type in:
```
heroku addons:create heroku-postgresql
```

When you are done, go to Heroku, and open your newly created application. Click on settings, and then "Reveal Config":

You should be able to see a DATABASE_URL setting.

Step 8| Add database information to your .env file
Make a copy of your .env file.

Open up Notepad, and paste in the DATABASE_URL obtained from the previous step.

Follow the steps below to obtain the host, user, password and database name:
```
The syntax is postgres://<user>:<password>@<host>/<database_name>?reconnect = true

Example:
postgres://b80f8d428xxxxx:f48exxxx@us-cdbr-iron-east-02.cleardb.net/heroku_58632fb6debxxxx?reconnect=true

# host will be: us-cdbr-iron-east-02.cleardb.net

# user will be: B80f8d428xxxxx

# password will be: F48exxxx

# database_name will be: heroku_58632fb6debxxxx
```

In your .env file, change the setting DB_DRIVER to postgres

Update your .env file with the host, user, password and database name obtained from parsing the syntax above.

Finally, install postgres with:
```
yarn add pg
yarn add db-migrate-pg
```

Step 9| Setup tables with migrations

Change your database.json to read as below:
```
{
  "dev": {
    "driver": {"ENV" :"DB_DRIVER"},
    "user": {"ENV": "DB_USER" },
    "password": {"ENV":"DB_PASSWORD"},
    "database": {"ENV":"DB_DATABASE"},
    "host": {"ENV":"DB_HOST"},
    "ssl": {
         "rejectUnauthorized": false
    }
  }
}
```


Do the same for bookshelf/index.js
```
const knex = require('knex')({
    'client': process.env.DB_DRIVER,
    'connection': {
        'user': process.env.DB_USER,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_DATABASE,
        'host':process.env.DB_HOST,
        'ssl': {
            'rejectUnauthorized': false
        }
    }
})
```

In the terminal, type in:
```
./db-migrate.sh up
```

The migration takes a longer time to run now because it is happening on a remote server.

Step 10| Copy all settings from the  .ENV file to Heroku

Once more, go to your application in Heroku and copy over the various settings from your .env file over.

Step 11| Do a commit and then push to Heroku
We have made some changes to our code, so be sure to commit and push.

Step 12| Install DB Beaver
We need a software that allows us to add in new categories, tags and etc, and one way of connecting to the new Postgres database that we have is Dbeaver.  Head off to https://dbeaver.io/ to download the community version of Dbeaver and install that on your computer.

After this, launch the software. 

From the pop-up window, select Postgres:


It will then request to download some necessary files. Allow the operation.


In the window that shows up next, fill in the Postgres database you obtained from step 8. Once finished, click on the Finish button.


The new connection will appear on the left-hand side window. Double click on it. You will be able to see all your tables once you collapse the schemas then publics folder:


Select the categories table.


Click on the Insert Row button at the bottom of the table (or just press ALT + INSERT) to add a new row.  (See diagram below):

Add as many categories as you like.  Do not fill in the id column (leave it as the text in grey).

Click on the Save button at the bottom of the table when done

Step 13| Generate a new endpoint secret for your Heroku checkout
Go to Stripe, and add in a new endpoint for https::/heroku_url/checkout/process_payment, and replace the old endpoint secret with the new one in your Heroku settings.

Credits: Mr Paul Chor

## Netlify

Ensure that the repo only has one project. The root must contain package.json 

Go to netlify.com click on "New site from Git".

Select "GitHub"

After authorization, search repo and select the repo
# Technologies
In this application JSX is used to structure the content, CSS3 and Bootstrap for styling and JavaScript to process data.

Gitpod is used as the main coding platform. 

Several other tools that played a role in this application:

For API,
* [Axios](https://github.com/axios/axios)

For styling,
* [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

For deployment,
* [Github](https://github.com/)
* [Heroku](https://www.heroku.com/)
* [Netlify](https://netlify.app/)

For icons,
* [Flaticon](https://www.flaticon.com/)
* [FontAwesome](https://fontawesome.com/)

For Form Helper,
* [Caolan-Forms](https://github.com/caolan/forms)

For ORM,
* [Bookshelf](https://bookshelfjs.org/)

For Database migration,
* [Db-migrate](https://github.com/db-migrate)

For images of tea and layout inspiration,
* [Art-Of-Tea](https://www.artoftea.com/)

For payment,
* [Stripe](https://stripe.com/en-sg)

For image processing and storage,
* [Uploadcare](https://uploadcare.com/)

Others,

* CORS
* csurf
* jsonwebtoken
* select2
* hbs
* wax-on
* knex
* express
* connect-flash
* db-migrate-mysql
* db-migrate-pg
* pg

 
# Acknowledgments
* Mr Paul Chor - For all the countless suggestions and help
* Mr Ace Liang - For sharing processing information tips
* Mr Benjamin Png - For your continuous assitance and brainstorming of ideas 

I do not own any rights to the images, all rights belongs to their respective creator. This is a personal project. 