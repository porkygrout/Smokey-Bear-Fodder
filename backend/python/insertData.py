# insert data from csv to mongo server
import pymongo
import pandas as pd

# setup mongo connectionb
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# select database and collection to use
db = client.fire_db

# message to confirm data pull from csv started
print("Data Pull Starting...Please Wait...")

# import csv file and turn it into dictionary
csv_file = '../data/FireTable.csv'
fire_data = pd.read_csv(csv_file, encoding= 'unicode_escape')
print("Data Pull Complete")
print("Building Data Tables...Please Wait...")
states = ["NY","PA","MD","DE","NJ","CT","RI","MA","NH","VT","ME"]
for state in states:
    collection = db[f"fire_table_{state}"]
    fire_data_lite = fire_data[fire_data["STATE"] == state]
    fire_data_liter = fire_data_lite.dropna()
    fire_data_liter.columns = fire_data_liter.columns.str.lower()
    fire_dict = fire_data_liter.to_dict('records')
    print(f"{state} Table Complete")

    # prevent duplication
    collection.drop()

    # message to confirm data upload started
    print(f"{state} Data Upload Starting...Please Wait...")

    # insert into database
    collection.insert_many(fire_dict)
    print(f"{state} Table Uploaded!")

# text to confirm data uploaded
print("All States Data Uploaded!")

# show how many rows were imported
index = fire_data.index
number = len(index)
print(f"{number} Rows Imported!")

