from dht22 import main as collect_data
from dotenv import load_dotenv
import os

load_dotenv()

def main():
    try:
        # Execute data collection
        collect_data()

    except KeyboardInterrupt:
        print("Program terminated by user.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    finally:
        print("Exiting main program.")

if __name__ == "__main__":
    main()
