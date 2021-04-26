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
Url to live site: 

![Display sample on different devices upon loading](images/display-sample.png)


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
