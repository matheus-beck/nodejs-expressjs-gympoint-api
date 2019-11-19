# 🏋️ GymPoint

Full Stack app developed to make it easier to manage Gyms. The app is called `GymPoint` and it was developed using Node.js in the backend and React.js and React Native in the frontend

# Backend: Rest API using Node.js, Express.js, Docker, Redis, MongoDB and PostgreSQL

## Dependencies used

* "@sentry/node": Initialize the Sentry SDK and hook into the environment
* "bcryptjs": Uses a password hashing function to store passwords on database
* "bee-queue": A simple, fast, robust job/task queue for our mail sanding in Node.js
* "date-fns": A date utility library used in the appointments
* "dotenv": A zero-dependency module that loads environment variables from a .env file into process.env
* "express": A minimal and flexible Node.js web application framework that provides a robust set of features
* "express-async-errors": Handles async errors inside express
* "express-handlebars": Handles handlebars templates inside express
* "jsonwebtoken": An implementation of JSON Web Tokens
* "mongoose": An elegant mongodb object modeling for node.js
* "multer": Node.js middleware for handling multipart/form-data
* "nodemailer": A module for Node.js applications to allow easy email sending
* "nodemailer-express-handlebars": Express Handlebars plugin for Nodemailer
* "pg": Non-blocking PostgreSQL client for Node.js
* "pg-hstore": A node package for serializing and deserializing JSON data to hstore format
* "sequelize": A promise-based Node.js ORM for Postgres
* "youch": Pretty error reporting for Node.js
* "yup": A JavaScript object schema validator and object parser

## Getting started
Clone the project into your machine and install all dependencies using:
```console
npm install
```
or
```console
yarn install
```

Now, run these three Docker containers in your machine:
```console
sudo docker run --name gympoint -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
sudo docker run --name mongogym -p 27017:27017 -d -t mongo
sudo docker run --name redisgym -p 6379:6379 -d -t redis:alpine
```

You also have to create a database called 'gympoint' inside the PostgreSQL ([Here is an example using Postbird](https://matheus-beck.github.io/blog/docker/postgresql/postbird/sequelize/2019/09/11/configuring-postgres-docker-postbird-sequelize.html)) and create the tables using:
```console
yarn sequelize db:migrate
```

Finally, to run the server: 

```console
yarn dev
```

And to run the mail queue:

```console
yarn queue
```

---

Made with ❤️ and ☕ by Matheus Beck :wave: [Get in touch!](https://www.linkedin.com/in/matheus-beck/)
