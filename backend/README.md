### Install Backend dependencies

In order to install the server dependencies as per `requirements.txt`, run the following commands on your terminal:

`cd backend` <br>
`pip install -r requirements.txt`

In order to start the server, run:

### Running development server

You'll need to start 3 terminal windows. On the first one, run:

`redis-server`

On the second one, you'll need to have the worker listening to job tasks. For that, run:

`python worker.py`

Finally, on the third terminal window, start the development server with:

`python app.py`

### Run tests

In order to test the application, run:

`python tests.py`
