import json
import socket
import time
from time import sleep
import Adafruit_DHT as dht
from dotenv import load_dotenv
import os

load_dotenv()

DHT_PIN = 4
SERVER_HOST = os.getenv("SERVER_HOST", "localhost")
SERVER_PORT = int(os.getenv("SERVER_PORT", 3000))

def send_data(host, port, temperature, humidity):
    data = {
        "temperature": temperature,
        "humidity": humidity
    }

    try:
        # Create a socket connection
        with socket.create_connection((host, port), timeout=5) as sock:
            # Send JSON-encoded data to the server
            sock.sendall(json.dumps(data).encode())
            print(f"Data sent successfully - Temperature: {temperature}°C, Humidity: {humidity}%")
    except Exception as e:
        print(f"Error sending data: {str(e)}")

while True:
    # Read Temp and Hum from DHT11
    humidity, temperature = dht.read_retry(dht.DHT11, DHT_PIN)

    # Print Temperature and Humidity on the Shell window
    print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
    sleep(3)  # Wait 3 seconds and read again

    # Replace these values with actual temperature and humidity data
    temperature_value = temperature
    humidity_value = humidity

    send_data(SERVER_HOST, SERVER_PORT, temperature_value, humidity_value)

    # Sleep for a while before sending the next data
    time.sleep(5)
