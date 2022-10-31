import pandas as pd
from sqlalchemy import create_engine

db = pd.read_csv('FIFA-21 Complete.csv', delimiter=";")

print("Table datatypes - \n")
print(db.dtypes)
print("\n\n")

db = db.set_index('player_id')
db.team = db.team.str.rstrip()

print(db.head())
print("\n\n")

engine = create_engine('postgresql://sm185711:soundarzozm@localhost:5432/fifa21')
db.to_sql('data', engine)

print("Done adding the csv to the psql database.")
