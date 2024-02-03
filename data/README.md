# ThinkBig Data Stream

## Overview

The Raspberry Pi Stream script is responsible for capturing temperature and humidity data using a DHT11 sensor and streaming it to the ThinkBig IoT Blockchain System server via a socket connection. This script runs continuously, periodically reading sensor data and sending it to the server for further processing.

## Prerequisites

- Raspberry Pi with Adafruit_DHT library installed (`pip install Adafruit_DHT`)
- Connection to a DHT11 sensor
- Access to the ThinkBig IoT Blockchain System server

## Configuration

1. Open the `stream.py` script.
2. Update .env `server_host` and `server_port` variables with the appropriate server details.
3. Ensure the correct pin for the DHT11 sensor is set in the `DHT` variable.

## Usage

Run the script on your Raspberry Pi using the following command:

```bash
python stream.py
```

The script will continuously read temperature and humidity data from the DHT11 sensor, print it to the console, and send it to the ThinkBig server.

## Customize Sending Interval

Adjust the sleep duration (`time.sleep(5)`) at the end of the script to control the interval between data transmissions.
