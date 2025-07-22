# Rice Disease Classification System

![Rice Disease Classification](frontend/assets/demo.gif)

An AI-powered web application for automated detection and classification of rice plant diseases using deep learning techniques.

## Features

- **Accurate Disease Detection**: Identifies common rice diseases including Bacterial Blight, Blast, and Brown Spot with high accuracy
- **User-friendly Interface**: Intuitive drag-and-drop interface for uploading leaf images
- **Bilingual Support**: Displays disease names in both English and Malayalam
- **Real-time Analysis**: Provides instant classification results with confidence scores
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

### Frontend
- React 17
- Material-UI v5
- React Dropzone
- Axios

### Backend
- FastAPI
- TensorFlow 2.13
- OpenCV
- Python 3.10+

## Installation and Setup

### Prerequisites
- Node.js and npm
- Python 3.10 or later
- Git

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/sinanshamsudheen/RiceDiseaseClassifier.git
   cd rice-disease
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install the required Python packages:
   ```bash
   cd api
   pip install -r requirements.txt
   ```

4. Start the API server:
   ```bash
   python main.py
   ```
   The API server will run on http://localhost:8000

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install the required npm packages:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will be available at http://localhost:3000

## Usage
1. Open the web application in your browser
2. Upload an image of a rice plant leaf using drag-and-drop or by clicking the upload area
3. Wait for the system to process and analyze the image
4. View the diagnosis results showing the detected disease and confidence score
5. Click "Clear" to analyze another image

## Model Training
The classification model was trained on a dataset of rice leaf images containing examples of healthy leaves and those affected by various diseases. The model was built using transfer learning with pre-trained CNN architectures to achieve high accuracy.

## Future Improvements
- Mobile application for offline detection
- Support for additional rice diseases
- Enhanced visualization of affected areas
- Treatment recommendations based on detected diseases
- Integration with agricultural management systems

## Contributors
- [Your Name](https://github.com/sinanshamsudheen)

## License
This project is licensed under the MIT License - see the LICENSE file for details.
