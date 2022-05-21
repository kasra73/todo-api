# TODO API

This a todo list api written in TypeScript and express. Project description is as follows:

Implement a RESTful API that allows users to perform all of these tasks (Todo API) after logging in:

* Create new item or items
* Query an item or items
* Query items based on status or due date
* Change the status of an item as in-progress or done
* Change the due date of an item
* Delete an item

The following properties should be associated with each item (to-do):

* id
* title
* description
* author/userId
* status
* dueDate

### Note:

* Users should have their own to-do list.
* Use MongoDB for your DB
* Containerize your projects with Docker/Docker
Compose/Nginx
* Optionally, you can write some tests for Todo services

### Submission:

Create a repository on your GitHub page for this test (Share the link when you schedule a
meeting)

## Running and Testing

### Development mode

To run the project in development mode, simply customize `.env.development.local` file then execute:

`npm run dev`

### Running the tests

To run the project's tests, customize the `.env.test.local` file then execute:

`npm run test`

### Production mode

There are two different docker-compose files available to run the project in production mode and development mode. To use `docker-compose.yml` file, first customize the `.env.production.local` file and create/start docker containers:

`docker-compose up -d`

After building the docker image, you can remove everything from from the project directory except logs and data directories (unless you use named volumes in docker-compose file).

## Using the API

After running the app successfully, open http://localhost:8050/api-docs to see the API documentation.
