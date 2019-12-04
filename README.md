# 🏋️ GymPoint

<h1 align="center">
  <img src="https://i.imgur.com/mxs3Ief.png" width="200">
</h1>

Full Stack app developed to make it easier to manage Gyms. The app is called **GymPoint** and it was developed using Node.js in the backend and React.js and it will use React.js and React Native in the frontend

# Backend: Rest API using Node.js, Express.js, Docker, Redis, MongoDB and PostgreSQL

## Dependencies used

* "bcryptjs": Uses a password hashing function to store passwords on database
* "bee-queue": A simple, fast, robust job/task queue for our mail sanding in Node.js
* "date-fns": A date utility library used in the appointments
* "dotenv": A zero-dependency module that loads environment variables from a .env file into process.env
* "express": A minimal and flexible Node.js web application framework that provides a robust set of features
* "express-async-errors": Handles async errors inside express
* "express-handlebars": Handles handlebars templates inside express
* "jsonwebtoken": An implementation of JSON Web Tokens
* "multer": Node.js middleware for handling multipart/form-data
* "nodemailer": A module for Node.js applications to allow easy email sending
* "nodemailer-express-handlebars": Express Handlebars plugin for Nodemailer
* "pg": Non-blocking PostgreSQL client for Node.js
* "pg-hstore": A node package for serializing and deserializing JSON data to hstore format
* "sequelize": A promise-based Node.js ORM for Postgres
* "yup": A JavaScript object schema validator and object parser

## Getting started
1. Clone the project into your machine and install all dependencies inside the `backend` folder using:
```console
yarn install
```

2. Now, run these three Docker containers in your machine:
```console
sudo docker run --name gympoint -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
sudo docker run --name redisgym -p 6379:6379 -d -t redis:alpine
```

3. You also have to create a database called 'gympoint' inside the PostgreSQL ([Here is an example using Postbird](https://matheus-beck.github.io/blog/docker/postgresql/postbird/sequelize/2019/09/11/configuring-postgres-docker-postbird-sequelize.html)) and create the tables using:
```console
yarn sequelize db:migrate
```

4. Rename the `.env.example` file for `.env` and put your credentials inside the `.env`

5. Finally, to run the server: 

```console
yarn dev
```

6. And to run the mail queue:

```console
yarn queue
```

---

Made with ❤️ and ☕ by Matheus Beck :wave: [Get in touch!](https://www.linkedin.com/in/matheus-beck/)
