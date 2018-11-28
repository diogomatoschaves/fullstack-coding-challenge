### Create .env file and create the following environment variables

`export APP_SETTINGS="config.DevelopmentConfig" <br>
export SECRET_KEY=<SECRET KEY> <br>
export SQLALCHEMY_DATABASE_URI="postgresql://@localhost/<DATABASE_NAME>`

### Install Backend dependencies

In order to install the server dependencies as per `requirements.txt`, run the following commands on your terminal:

`cd backend` <br>
`$ pipenv install`

Once virtual env is created, run the following command whenever you want to activate the virtual env.

 `$ pipenv shell`

In order to start the server, run:

### Create a new database

In order to create a new postgreSQL database, run on your terminal:

`$ psql`
`# create database <DATABASE_NAME>;`

replacing <DATABASE_NAME> with your custom db name.

Exit psql window and run:

`$ python manage.py db upgrade`

Which will create the database schema.

### Running server

You'll need to start 3 terminal windows.

On the first one, run:

`$ redis-server`

For the next terminal windows, you'll need to first execute the command to activate the virtual env,
and then export the environment variables:

`pipenv shell <br>
export APP_SETTINGS="config.DevelopmentConfig" <br>
export SECRET_KEY=<SECRET KEY> <br>
export SQLALCHEMY_DATABASE_URI="postgresql://@localhost/<DATABASE_NAME>`
`

On the seconf terminal window, run:

`$ python worker.py`

So that a worker will be listening for job requests.

Finally, on the third terminal window, start the development server with:

`$ python app.py`

The app is now listening to requests from the client

### Run tests

In order to test the application, run:

`$ python tests.py`
