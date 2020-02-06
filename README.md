# typescrip-levelup

## Introduction

This product is a realization of basic CRUD operations for learning typescript
The product is a stock management system that at present only covers the stock item but can later be expanded to a fully fledged Point Of Sale application. This repo contains the back end implementation there of

## Local Installation

  - [clone](https://github.com/Anguandia/typescrip-levelup.git) the repo
  - Install postgres and create a database with any name, db_name
  - Create a .env file as shown in the sample .env file
  - Run npm install
  - Fill in the correct values for your environment variable
  - Run npm run dev to start in development mode
  
## Features and manual testing on postman

**Create a stock item:**
  - Method: POST
  - Endpoint: ***{{baseUrl}}/stock***
  - Body:
    - name: ***string***
    - quantity: ***number***
    - unitPrice: ***string***
    
**View all stock:**
  - Method: ***GET***
  - Endpoint: ***{{baseUrl}}/stock***
  
**View single stock item:**
  - Method: ***GET***
  - Endpoint: ***{{baseUrl}}/stock/{{item id}}***
  
**Update item:**
  - Method: ***PUT***
  - Endpoint: ***{{baseUrl}}/stock/{{item id}}***
  - Body: any or all of
    - name: ***string***
    - quantity: ***number***
    - unitPrice: ***string***
    
**Delete item:**
  - Method: ***DELETE***
  - Endpoint: ***{{baseUrl}}/stock/{{item id}}***
  
## Cloud hosting link

  https://typescriptlevelup.herokuapp.com/
