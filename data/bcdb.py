from bigchaindb_driver import BigchainDB
from bigchaindb_driver.crypto import generate_keypair
import time
import json
from dotenv import load_dotenv
import os

load_dotenv()

# Set up BigchainDB connection
BIGCHAINDB_URL = os.getenv("BIGCHAINDB_URL")
bdb = BigchainDB(BIGCHAINDB_URL)

# Generate a key pair for the data owner
data_owner_keypair = generate_keypair()

def create_asset(data):
    asset = {
        'data': data,
    }
    return asset

def create_transaction(asset, metadata):
    tx = bdb.transactions.prepare(
        operation='CREATE',
        signers=data_owner_keypair.public_key,
        asset=asset,
        metadata=metadata
    )
    signed_tx = bdb.transactions.fulfill(tx, private_keys=data_owner_keypair.private_key)
    return signed_tx

def store_data_in_bcdb(temperature, humidity):
    try:
        # Create asset
        asset_data = {
            'temperature': temperature,
            'humidity': humidity,
        }
        asset = create_asset(asset_data)

        # Create metadata (optional)
        metadata = {'timestamp': time.time()}

        # Create transaction
        tx = create_transaction(asset, metadata)

        # Store the transaction in BigchainDB
        bdb.transactions.send_commit(tx)

        print(f"Data stored in BigchainDB: {json.dumps(asset_data)}")

    except Exception as e:
        print(f"An error occurred while storing data in BigchainDB: {str(e)}")

if __name__ == "__main__":
    # Example data (replace with actual collected data)
    example_data = {
        'temperature': 25.5,
        'humidity': 50.2,
    }

    # Store data in BigchainDB
    store_data_in_bcdb(**example_data)
