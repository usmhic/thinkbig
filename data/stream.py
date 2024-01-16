import json
import socket
import time

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

if __name__ == "__main__":
    # Replace 'localhost' and 3000 with the appropriate server host and port
    server_host = 'localhost'
    server_port = 3000

    while True:
        # Replace these values with actual temperature and humidity data
        temperature_value = 25
        humidity_value = 50

        send_data(server_host, server_port, temperature_value, humidity_value)

        # Sleep for a while before sending the next data
        time.sleep(5)
