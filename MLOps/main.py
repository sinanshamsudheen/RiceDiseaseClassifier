from fastapi import FastAPI, File, UploadFile
import uvicorn
from io import BytesIO
from PIL import Image
import numpy as np

app = FastAPI()
@app.get("/ping")

async def ping():
    return {"message": "pong"}

def read_image_from_file(file_content: bytes) -> np.ndarray:
    image = Image.open(BytesIO(file_content))
    print(image)
    return image

@app.post("/predict")
async def predict(
        file: UploadFile = File(...),
):
    image = read_image_from_file(await file.read())
    print(image)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)