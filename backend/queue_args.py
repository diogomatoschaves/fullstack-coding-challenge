from rq import Queue
import worker

def get_queue():

    return Queue(connection=worker.conn)

def get_conn():

    return worker.conn

def enqueue(q, func, data):

    return q.enqueue(func, data)