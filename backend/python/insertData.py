# insert data from csv to mongo server
import pymongo
import pandas as pd

# setup mongo connectionb
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# select database and collection to use
db = client.fire_db
collection = db.fire_table

# message to confirm data pull from csv started
print("Data Pull Starting...Please Wait...")

# import csv file and turn it into dictionary
csv_file = 'C:/Users/powde/Desktop/Smokey-Bear-Fodder/backend/data/FireTable.csv'
fire_data = pd.read_csv(csv_file, encoding= 'unicode_escape')
print("Data Pull Complete")
print("Building Data Table...Please Wait...")
fire_data_lite = fire_data[["FIRE_NAME","FIRE_YEAR","DISCOVERY_DOY","LATITUDE","LONGITUDE","STAT_CAUSE_DESCR","STATE"]]
fire_data_lite = fire_data_lite[fire_data_lite["STATE"] == "NY"]
# fire_data_lite = fire_data_lite[fire_data_lite["FIRE_YEAR"] == 2015]
fire_data_liter = fire_data_lite.dropna()
fire_data_liter.columns = fire_data_liter.columns.str.lower()
fire_dict = fire_data_liter.to_dict('records')
print("Table Complete")

# prevent duplication
collection.drop()
print("Removing Previous DB Data")

# message to confirm data upload started
print("Data Upload Starting...Please Wait...")

# insert into database
collection.insert_many(fire_dict)

# text to confirm data uploaded
print("Data Uploaded!")

# show how many rows were imported
index = fire_data_liter.index
number = len(index)
print(f"{number} Rows Imported!")