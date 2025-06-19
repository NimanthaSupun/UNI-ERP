from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your trained model and scaler
model = tf.keras.models.load_model('model/best_model.keras')
scaler_data = joblib.load('model/scaler_data.sav')  # You need to save your scaler when training

# Career mapping from your predict function
reverse_mapping = {
    0: 'Artificial Intelligence & Data Science',
    1: 'Frontend Web & UI/UX Design', 
    2: 'Internet of Things (IoT) & Embedded Systems',
    3: 'Cloud Computing & DevOps',
    4: 'Network Systems & Communication Technologies',
    5: 'Game Development & Simulation',
    6: 'Cybersecurity & Digital Forensics',
    7: 'Business Data Analytics & Visualization',
    8: 'Mobile Application Development',
    9: 'AI Ethics, Policy & Governance'
}
def predict_student_career(student_features):
    
    # Scale the features
    student_scaled = scaler_data.transform([student_features])
    
    # Get prediction probabilities
    probabilities = model.predict(student_scaled)[0]
    
    # Get top 3 predictions
    top_3_indices = np.argsort(probabilities)[-3:][::-1]
    
    recommendations = []
    for i, idx in enumerate(top_3_indices):
        career = reverse_mapping[idx]
        probability = probabilities[idx]
        # recommendations.append(career)
        recommendations.append({
            'topic': reverse_mapping[idx],
            'confidence': round(float(probabilities[idx]) * 100, 1)  # Convert to % and round
        })
        print(f"{i+1}. {career}: {probability:.3f} ({probability*100:.1f}%)")
    
    return recommendations

@app.route('/getresult', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received data:", data)
        
        # Get the features array from the request
        features = data.get('features', [])
        print("Features array:", features)
        print("Features length:", len(features))
        
        # Validate that we have exactly 32 features
        if len(features) != 32:
            return jsonify({
                'error': f'Expected 32 features, but received {len(features)}'
            }), 400
        
        # Convert to numpy array
        features_array = np.array(features, dtype=float)
        
        # Get predictions
        recommendations = predict_student_career(features_array)
        
        return jsonify({
            'recommendations': recommendations,
            'status': 'success'
        })
        
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

if __name__ == "__main__":
    print("Starting Flask server...")
    print("Model loaded successfully")
    print("Available endpoints:")
    print("- POST /getresult")
    app.run(debug=True,port=5000)