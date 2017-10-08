"""
MSSQL Connector that inserts detected event into the Event table in MSSQL.
"""
import pyodbc

SQL = "INSERT into Event (Source, Date, Name, Detail, Latitude, Longitude) values (?, ?, ?, ?, ?, ?)"

class DatabaseConnector():

    def __init__(self):
        server = 'eventchat.database.windows.net'
        database = 'EventChat'
        username = 'eventchat'
        password = '2017mobile!'
        driver = '{ODBC Driver 13 for SQL Server}'
        self.cnxn = pyodbc.connect(
            'DRIVER=' + driver + ';PORT=1433;SERVER=' + server + ';PORT=1443;DATABASE=' + database + ';UID=' + username + ';PWD=' + password)
        self.cursor = self.cnxn.cursor()

    def insert_event(self, source, date, name, detail, lat, lon):
        self.cursor.execute(SQL, (source, date, name, detail, lat, lon))
        self.cnxn.commit()
        self.cursor.close()
        self.cnxn.close()