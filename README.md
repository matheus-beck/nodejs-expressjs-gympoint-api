# 🏋️ GymPoint

<h1 align="center">
  <img src="https://i.imgur.com/mxs3Ief.png" width="200">
</h1>

Full Stack app developed to make it easier to manage Gyms. The app is called **GymPoint** and it was developed using Node.js in the backend and React.js and it will use React.js and React Native in the frontend

# Backend: Rest API using Node.js, Express.js, Docker, Redis and PostgreSQL

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

## Sequelize Models

#### User Model

| Field         | Description                    | Type    | Allow Null |
| ------------  | ------------------------------ | ------  | ---------- |
| id            | user id                        | INTEGER |   False    |
| name          | user name                      | STRING  |   False    |
| email         | user email                     | STRING  |   False    |
| password_hash | user password hash             | STRING  |   False    |
| created_at    | creation date                  | DATE    |   False    |
| updated_at    | update date                    | DATE    |   False    |

#### Student Model

| Field         | Description                       | Type    | Allow Null |
| ------------  | --------------------------------- | ------  | ---------- |
| id            | student id                        | INTEGER |   False    |
| name          | student name                      | STRING  |   False    |
| email         | student email                     | STRING  |   False    |
| idade         | student age                       | INTEGER |   False    |
| peso          | student weight                    | FLOAT   |   False    |
| altura        | student height                    | FLOAT   |   False    |
| created_at    | creation date                     | DATE    |   False    |
| updated_at    | update date                       | DATE    |   False    |

#### Plan Model

| Field         | Description                    | Type    | Allow Null |
| ------------  | ------------------------------ | ------  | ---------- |
| id            | plan id                        | INTEGER |   False    |
| title         | plan title                     | STRING  |   False    |
| duration      | plan duration                  | INTEGER |   False    |
| price         | plan price                     | FLOAT   |   False    |
| created_at    | creation date                  | DATE    |   False    |
| updated_at    | update date                    | DATE    |   False    |

#### Help Order Model

| Field         | Description                    | Type    | Allow Null |
| ------------  | ------------------------------ | ------  | ---------- |
| id            | help order id                  | INTEGER |   False    |
| student_id    | student id                     | INTEGER |   False    |
| question      | help order question            | STRING  |   False    |
| answer        | help order answer              | STRING  |   True     |
| answer_at     | answer date                    | DATE    |   True     |
| created_at    | creation date                  | DATE    |   False    |
| updated_at    | update date                    | DATE    |   False    |

#### Checkin Model

| Field         | Description                    | Type    | Allow Null |
| ------------  | ------------------------------ | ------  | ---------- |
| id            | help order id                  | INTEGER |   False    |
| student_id    | student id                     | INTEGER |   False    |
| created_at    | creation date                  | DATE    |   False    |
| updated_at    | update date                    | DATE    |   False    |

## Routes

#### Sessions

- `POST /sessions`: This route creates a session and requires a body like the following example: `{ "email": "admin@gympoint.com", "password": "123456" }`. This route also return to us a JWT (Jason Web Token) that has to be used in the following routes

#### Students

- `GET /students/:id/checkins`: This route lists all check-ins made by the student at the gym

- `POST /students/:id/checkins`: This route creates an check-in by the student at the gym

- `GET /students/:id/help-orders`: This route lists all help orders created by the student

- `POST /students/:id/help-orders`: This route creates a help order to the gym and requires a body like the following example is passed: `{ "question": "How should I...?" }`

- `POST /students`: This route creates an student (if the admin is logged in the system) and requires a body like the following example: `{ "name": "Matheus", "email": "test@email.com", "idade": "123456", "peso": 68.7, "altura": 1.73 }`

- `PUT /students/:id`: This route updated an student (if the admin is logged in the system) and can update the fields like the following example: `{ "name": "Matheus", "email": "test@email.com", "idade": "123456", "peso": 68.7, "altura": 1.73 }`

#### Plan

- `GET /plans`: This route lists all plans registered at the gym

- `POST /plans`: This route creates a new plan and requires a body like the following example: `{ "title": "Gold", "duration": "3", "price": 129.90 }`

- `PUT /plans/:id`: This route updates the fields of the plan when passing a body like the following example: `{ "title": "Gold", "duration": "3", "price": 129.90 }`

- `DELETE /plans/:id`: This route deletes a plan based on his ID

#### Subscriptions

- `GET /subscriptions`: This route lists all subscriptions registered at the gym

- `POST /subscriptions`: This route creates a new subscription for a student and requires a body like the following example: `{ "student_id": 1, "plan_id": 2, "start_date": "2019-02-01T23:00:00-03:00" }`

- `PUT /subscriptions/:id`: This route updates the fields of the subscription when passing a body like the following example: `{ "plan_id": 3, "start_date": "2019-05-01T23:00:00-03:00" }`

- `DELETE /subscriptions/:id`: This route deletes a subscription based on his ID

#### Help Orders

- `GET /help/`: This route lists all help orders created by students that were not answered yet

- `POST /help-orders/:id/answer`: This route answer a help order created by a client and send him a mail to notify him. It requires a body like the following example: `{ "answer": "You should..." }`

---

Made with ❤️ by Matheus Beck :wave: [Get in touch!](https://www.linkedin.com/in/matheus-beck/)
