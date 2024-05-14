from flask import Flask
from flask_cors import CORS
import sqlite3
import pandas as pd
import numpy as np

def get(name):
    conn = sqlite3.connect(r"C:\Users\shami\OneDrive\Desktop\university\Data_Mining_Lab\project\git\data.db")
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {name}")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    test = []
    for i in rows:
        test.append({"date":i[0],"close":i[1]})
    further = test[93:]
    test = test[:93]
    return [test, further]

def get_test():
    conn = sqlite3.connect(r"C:\Users\shami\OneDrive\Desktop\university\Data_Mining_Lab\project\git\data.db")
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM Testing")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    test = []
    for i in rows:
        test.append({"date":i[0],"close":i[1]})
    return test


app = Flask(__name__)
CORS(app)


# LSTM_Prediction
# Hybrid_Prediction
@app.route("/home")
def home():
    testing = get_test()
    ANN_test, ANN_further = get("ANN_Prediction")
    Arima_test, Arima_further = get("Arima_Prediction")
    Sarima_test, Sarima_further = get("Sarima_Prediction")
    Svr_test, Svr_further = get("svr_Prediction")
    Ets_test, Ets_further = get("ETS_Prediction")
    Prophet_test, Prophet_further = get("Prophet_Prediction")
    LSTM_test, LSTM_further = get("LSTM_Prediction")
    Hybrid_test, Hybrid_further = get("Hybrid_Prediction")
    dummyData = {
        'ANN': [ANN_test,testing,ANN_further],
        'ARIMA': [Arima_test,testing,Arima_further],
        'SARIMA': [Sarima_test,testing,Sarima_further],
        'SVR': [Svr_test,testing,Svr_further],
        'ETS': [Ets_test,testing,Ets_further],
        'Prophet': [Prophet_test,testing,Prophet_further],
        'LSTM': [LSTM_test,testing, LSTM_further],
        'Hybrid': [Hybrid_test,testing,Hybrid_further]
    }
    return dummyData

if __name__ == "__main__":
    app.run(debug=True)