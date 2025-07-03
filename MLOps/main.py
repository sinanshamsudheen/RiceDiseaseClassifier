from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import cv2

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = tf.keras.models.load_model("../saved_models/1")

CLASS_NAMES = ['Bacterialblight', 'Blast', 'Brownspot', 'HealthyRiceLeaf']

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    print(f"Original image shape: {image.shape}")
    # Resize image to 224x224 to match model's expected input shape
    image = cv2.resize(image, (224, 224))
    
    # Ensure image has 3 channels
    if len(image.shape) < 3:
        # Convert grayscale to RGB
        image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
    elif image.shape[2] == 4:
        # Convert RGBA to RGB
        image = cv2.cvtColor(image, cv2.COLOR_RGBA2RGB)
    
    print(f"Processed image shape: {image.shape}")
    return image

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    
    print(f"Input batch shape: {img_batch.shape}")
    print(f"Model expects input shape: {MODEL.input_shape}")
    
    predictions = MODEL.predict(img_batch)

    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8001)
