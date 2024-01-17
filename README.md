Start the backend API by connecting the MySQL database with Prisma schema. Establish REST endpoints
- npm install
- npx prisma generate
- npm start

Start the frontend React app to show and interact with the populated data
- cd frontend
- npm install
- npm start

To test the API using jest
- npm test

To test GraphQL API
- go to http://localhost:3000/graphql
- for example: query {
  books {
    id
    title
  }
}

![Alt Text](enablment/Skærmbillede 2024-01-17 kl. 14.39.23.jpg)