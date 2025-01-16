from flask import Flask, request, jsonify
import pandas as pd
from datetime import datetime, timedelta
from statsmodels.tsa.arima.model import ARIMA
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/forecast', methods=['POST'])
def forecast_price():
    try:
        # Load data
        df = pd.read_csv('transformed_data.csv')

        # Get input parameters from request
        data = request.json
        crop_name = data.get('crop_name', '').strip()
        location = data.get('location', '').strip()

        # Filter data
        filtered_data = df[(df['crop_name'] == crop_name) & (df['location'] == location)]

        if filtered_data.empty:
            return jsonify({"error": "No data available for the given crop name and location."}), 404

        # Prepare data for ARIMA
        data = filtered_data[['day_1', 'day_2', 'day_3', 'day_4', 'day_5', 'day_6', 'day_7']].values.flatten()
        data = pd.to_numeric(data, errors='coerce')
        data = data[~pd.isna(data)]

        if len(data) < 3:  # Check for minimum data points
            return jsonify({"error": "Not enough data points to fit the ARIMA model."}), 400

        # Fit ARIMA model
        model = ARIMA(data, order=(2, 1, 1))
        results = model.fit()

        # Forecast the next value
        forecast = results.forecast(steps=1)[0]
        
        end_date = datetime.now() 
        start_date = end_date - timedelta(days=6) 
        # Generate date labels for the xticks 
        date_labels = [(start_date + timedelta(days=i)).strftime('%d-%m-%Y') for i in range(8)]

        # Plot and save the graph
        plt.figure(figsize=(10, 6))
        plt.plot(data, label='Historical Data')
        plt.plot(len(data), forecast, 'ro', label='Forecasted Value')
        plt.title(f'Forecast for {crop_name} at {location}')
        plt.xlabel('Day')
        plt.ylabel('Price(per kg)')
        plt.xticks(ticks=range(8), labels=date_labels)
        plt.legend()
        save_path = os.path.join("graphsimgs", "forecast_graph.png")
        if not os.path.exists("graphsimgs"):
            os.makedirs("graphsimgs")
        plt.savefig(save_path)
        plt.close()

        # Return results
        return jsonify({
            "forecasted_price": round(forecast),
            "graph_path": save_path
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
