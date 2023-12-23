import Adafruit_DHT
import time
from dotenv import load_dotenv
import os
from bcdb import store_data_in_bcdb

load_dotenv()

DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = int(os.getenv("DHT_PIN"))
READ_INTERVAL_SECONDS = int(os.getenv("READ_INTERVAL_SECONDS"))

def read_dht22():
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
    return humidity, temperature

def main():
    try:
        print("Reading DHT22 data...")
        while True:
            humidity, temperature = read_dht22()

            if humidity is not None and temperature is not None:
                print(f'Temperature: {temperature:.2f}°C, Humidity: {humidity:.2f}%')
                
                # Store data in BigchainDB immediately
                store_data_in_bcdb(temperature, humidity)

            else:
                print('Failed to retrieve data. Check the sensor and try again.')

            time.sleep(READ_INTERVAL_SECONDS)

    except KeyboardInterrupt:
        print("Program terminated by user.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    finally:
        print("Exiting DHT22 data collection.")

if __name__ == "__main__":
    main()
