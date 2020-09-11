# build api to store data
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import pymongo

app = Flask(__name__)

# setup mongo connectionb
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# select database and collection to use
db = client.fire_db
collection = db.fire_table

# set cors to allow datapull via javascript
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/fire_log')
@cross_origin()
def fire_log():
    fire_info = [fire for fire in collection.find({}, {'_id': False})]
    # use print when testing
    # print(fire_info)
    return jsonify(fire_info)

if __name__ == "__main__":
    app.run(debug=True)