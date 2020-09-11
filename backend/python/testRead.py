# test run through terminal just to see if data and columns loaded properly.
from flask import Flask
import pymongo

app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# select database and collection to use
db = client.dummy4fire_db
collection = db.dummy4fire_table

# build flask app
@app.route("/test")
def index():
    # write a statement that finds all the items in the db and sets it to a variable
    fireLog = list(collection.find({},{'_id':False}))
    
    # print in terminal. Webpage will load TypeError.
    print(fireLog[1])

if __name__ == "__main__":
    app.run(debug=True)
