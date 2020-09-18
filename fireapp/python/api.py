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
states = ["NY","PA","MD","DE","NJ","CT","RI","MA","NH","VT","ME"]
collection = []
for state in states:
    collection.append(db[f"fire_table_{state}"])

# set cors to allow datapull via javascript
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/fire_log_ny')
@cross_origin()
def fire_log_ny():
    fire_info = [fire for fire in collection[0].find({}, {'_id': False})]
    # use print when testing
    # print(fire_info)
    return jsonify(fire_info)

@app.route('/api/fire_log_pa')
@cross_origin()
def fire_log_pa():
    fire_info = [fire for fire in collection[1].find({}, {'_id': False})]
    # use print when testing
    # print(fire_info)
    return jsonify(fire_info)

@app.route('/api/fire_log_md')
@cross_origin()
def fire_log_md():
    fire_info = [fire for fire in collection[2].find({}, {'_id': False})]
    # use print when testing
    # print(fire_info)
    return jsonify(fire_info)

@app.route('/api/fire_log_de')
@cross_origin()
def fire_log_de():
    fire_info = [fire for fire in collection[3].find({}, {'_id': False})]
    # use print when testing
    # print(fire_info)
    return jsonify(fire_info)

@app.route('/api/fire_log_nj')
@cross_origin()
def fire_log_nj():
    fire_info = [fire for fire in collection[4].find({}, {'_id': False})]
    # use print when testing
    # print(fire_info)
    return jsonify(fire_info)

@app.route('/api/fire_log_ct')
@cross_origin()
def fire_log_ct():
    fire_info = [fire for fire in collection[5].find({}, {'_id': False})]
    # use print when testing
    # print(fire_info)
    return jsonify(fire_info)

@app.route('/api/fire_log_ri')
@cross_origin()
def fire_log_ri():
    fire_info = [fire for fire in collection[6].find({}, {'_id': False})]
    # use print when testing
    # print(fire_info)
    return jsonify(fire_info)

@app.route('/api/fire_log_ma')
@cross_origin()
def fire_log_ma():
    fire_info = [fire for fire in collection[7].find({}, {'_id': False})]
    # use print when testing
    # print(fire_info)
    return jsonify(fire_info)

@app.route('/api/fire_log_nh')
@cross_origin()
def fire_log_nh():
    fire_info = [fire for fire in collection[8].find({}, {'_id': False})]
    # use print when testing
    # print(fire_info)
    return jsonify(fire_info)

@app.route('/api/fire_log_vt')
@cross_origin()
def fire_log_vt():
    fire_info = [fire for fire in collection[9].find({}, {'_id': False})]
    # use print when testing
    # print(fire_info)
    return jsonify(fire_info)

@app.route('/api/fire_log_me')
@cross_origin()
def fire_log_me():
    fire_info = [fire for fire in collection[10].find({}, {'_id': False})]
    # use print when testing
    # print(fire_info)
    return jsonify(fire_info)

if __name__ == "__main__":
    app.run(debug=True)