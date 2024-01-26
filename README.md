# ThinkBig: IoT Blockchain System

## Overview

![ThinkBig Architecture](architecture.png)

ThinkBig is an IoT Blockchain System designed to capture and process temperature and humidity data on the blockchain. This repository contains both the server-side and Raspberry Pi streaming components.

## Table of Contents

1. [Architecture](#architecture)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Server Setup](#server-setup)
   - [Raspberry Pi Setup](#raspberry-pi-setup)
4. [Project Structure](#project-structure)
   - [Server](#server)
   - [Raspberry Pi Stream](#raspberry-pi-stream)
5. [Contributing](#contributing)
6. [License](#license)

## Architecture

![Technologies Used](stack.png)

Provide an overview of the project's architecture, explaining the interaction between components. Highlight key features and how data flows through the system.

## Technologies Used

List the technologies used in the project along with brief descriptions. Include logos if possible.

- [Node.js](https://nodejs.org/): Backend server
- [Next.js](https://nextjs.org/): React framework for the frontend
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket): Real-time communication
- [BigchainDB](https://www.bigchaindb.com/): Blockchain database
- [Adafruit_DHT](https://github.com/adafruit/Adafruit_Python_DHT): Python library for DHT sensors
- ...

## Getting Started

Provide instructions on how to set up and run the project. Include any prerequisites and steps necessary for both the server and the Raspberry Pi streaming.

### Server Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure server settings.
4. Run the server with `npm start`.

### Raspberry Pi Setup

1. Clone the repository on your Raspberry Pi.
2. Install dependencies using `pip install -r requirements.txt`.
3. Configure the stream script with server details.
4. Run the script with `python stream_data.py`.

## Project Structure

Explain the structure of the project, detailing key directories and files for both the server and Raspberry Pi stream components.

### Server

Describe the server-side code organization, highlighting important files and directories.

### Raspberry Pi Stream

Explain the structure of the Raspberry Pi streaming script, detailing the purpose of each file or directory.

## Contributing

Guidelines for contributing to the project. Include information on how to report issues, submit pull requests, and coding standards.

## License

This project is licensed under the [MIT License](LICENSE).
