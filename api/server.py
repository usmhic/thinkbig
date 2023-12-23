from fastapi import FastAPI
from bigchaindb_driver import BigchainDB
from dotenv import load_dotenv
import os
import json

load_dotenv()

app = FastAPI()

# Set up BigchainDB connection
BIGCHAINDB_URL = os.getenv("BIGCHAINDB_URL")
bdb = BigchainDB(BIGCHAINDB_URL)

@app.get("/data")
async def get_data():
    try:
        # Retrieve the latest transaction from BigchainDB
        transactions = bdb.transactions.get(asset_id=None, operation='CREATE')
        
        if transactions:
            latest_transaction = transactions[0]
            asset_data = latest_transaction['asset']['data']
            return {"status": "success", "data": asset_data}
        else:
            return {"status": "error", "message": "No data available in BigchainDB."}

    except Exception as e:
        return {"status": "error", "message": f"An error occurred: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
