from flask import Flask, request, jsonify , send_file
from flask_cors import CORS
from gtts import gTTS
import shutil
import os
from ultralytics import YOLO
from collections import defaultdict

app = Flask(__name__)
CORS(app)

# Define the YOLO model
model = YOLO("bestv12.pt")

#c Mapped class
class_info = {
    0: {'name': '1000_baht', 'value': 1000},
    1: {'name': '100_baht', 'value': 100},
    2: {'name': '10_baht', 'value': 10},
    3: {'name': '1_baht', 'value': 1},
    4: {'name': '20_baht', 'value': 20},
    5: {'name': '2_baht', 'value': 2},
    6: {'name': '500_baht', 'value': 500},
    7: {'name': '50_baht', 'value': 50},
    8: {'name': '5_baht', 'value': 5}
}


@app.route("/",methods=["GET"])
def index():
    return "backend running✨✨✨"

# Route to handle image processing
@app.route("/get_sound", methods=["GET"])
def get_sound():
    # Replace 'path/to/your/sound/file.mp3' with the actual path to your .mp3 file
    sound_file_path = 'voice/total.mp3'
    # Specify the mimetype for .mp3 files
    return send_file(sound_file_path, mimetype='audio/mpeg', as_attachment=True)

@app.route("/get_image", methods=["POST"])
def get_image():
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400
        

    image = request.files["image"]

    # Save the uploaded image
    image.save('img/image.jpg')
    
    # Delete existing predicted
    if os.path.exists('runs/detect/predict'):
        shutil.rmtree('runs/detect/predict') 

    # Perform object detection using YOLO
    Img = 'img/image.jpg'
    result = model.predict(Img, conf=0.5, save_txt=True, save=True, save_dir='result')
    
    # Count detections for each class and calculate total value
    detected_classes = defaultdict(int)
    total_value = 0
    detection_details = []
    
    # Get result from file
    result_files = os.listdir('runs/detect/predict/labels')
    
    # Get the class and the values
    for file in result_files:
        if file.endswith('.txt'):
            with open(os.path.join('runs/detect/predict/labels', file), 'r') as f:
                lines = f.readlines()
                for line in lines:
                    data = line.split()
                    if len(data) >= 1:
                        class_id = int(data[0])
                        detected_classes[class_id] += 1 
                        class_info_entry = class_info.get(class_id)
                        if class_info_entry:
                            total_value += class_info_entry['value'] * detected_classes[class_id]
                            class_name = class_info_entry['name']
                            confidence = float(data[1])
                            bbox_values = list(map(float, data[2:]))
                            detection_details.append(f"Detected: {class_name} - Confidence: {confidence}, Bounding Box: {bbox_values}")
    
    total_value_text = f"{total_value} baht"
    total_obj = gTTS(text=total_value_text, lang='en', slow=False)
    total_obj.save("voice/total.mp3")

    sound_file_path = 'voice/total.mp3'
    # Specify the mimetype for .mp3 files
    #return send_file(sound_file_path, mimetype='audio/mpeg', as_attachment=True)
    # os.system("voice/total.mp3")
    # os.system("afplay voice/total.mp3")

    return jsonify({
        "total_value": total_value_text,
        "detection_details": detection_details
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=6702,debug=False)
# 0.0.0.0 all ip