# NodeJS Mentoring Program
## Documentation
API documentation: https://documenter.getpostman.com/view/12622244/TzCQa68w

## Environment
Create .env file in the root project folder. Set your own credentials.
Example:
```
SERVER_PORT=3000

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=db_name
```

## Setup
1. Install dependencies
```
npm install
```
1. Create .env file with your credentials (see example above)
2. Seed database
```
npx sequelize-cli db:migrate 
npx sequelize-cli db:seed:all
```
3. Run server
```
npm run start
```
## Task1
[description](https://epam.sharepoint.com/sites/EPAMNode.jsGlobalMentoringProgram/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FEPAMNode%2EjsGlobalMentoringProgram%2FShared%20Documents%2FGeneral%2FHomework%2FModule%201%2FHomework%201%2Epdf&parent=%2Fsites%2FEPAMNode%2EjsGlobalMentoringProgram%2FShared%20Documents%2FGeneral%2FHomework%2FModule%201&p=true&originalPath=aHR0cHM6Ly9lcGFtLnNoYXJlcG9pbnQuY29tLzpiOi9zL0VQQU1Ob2RlLmpzR2xvYmFsTWVudG9yaW5nUHJvZ3JhbS9FZWp6bG02X0dVcEttZHBRRFRzS2NSZ0JFMWx1T0tYV3djQjFuVnBaZjZWRkxnP3J0aW1lPXhZRmtsMkRrMkVn)

Run task 1.1 (reverse string)
```
npm run task1
```

Run task 1.2 (convert csv files)
```
npm run task2
```
