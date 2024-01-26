import json
import socket
import time
from time import sleep
import Adafruit_DHT as dht

DHT = 4

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

# Replace 'localhost' and 3000 with the appropriate server host and port
server_host = '141.94.78.58'
server_port = 3000

while True:
    #Read Temp and Hum from DHT11
    h,t = dht.read_retry(dht.DHT11, DHT)
    #Print Temperature and Humidity on Shell window
    print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(t,h))
    sleep(3) #Wait 3 seconds and read again

    # Replace these values with actual temperature and humidity data
    temperature_value = h
    humidity_value = t

    send_data(server_host, server_port, temperature_value, humidity_value)

    # Sleep for a while before sending the next data
    time.sleep(5)