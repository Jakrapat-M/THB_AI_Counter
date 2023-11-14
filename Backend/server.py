from flask import Flask, request, jsonify
from gtts import gTTS
import shutil
import os
from ultralytics import YOLO
from collections import defaultdict

app = Flask(__name__)

# Define the YOLO model
model = YOLO("bestv11.pt")

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

# Route to handle image processing
@app.route("/get_image", methods=["POST"])
def get_image():
    if "image" not in request.files:
        print("hihi")
        return jsonify({"error": "No image provided"}), 400
        

    image = request.files["image"]

    # Save the uploaded image
    print("heioosfd")
    print(image)
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
    
    total_value_text = f"{total_value} บาท"
    total_obj = gTTS(text=total_value_text, lang='th', slow=False)
    total_obj.save("voice/total.mp3")
    
    os.system("afplay voice/total.mp3")
    
    print(result)

    # # Process the result as needed
    # # For example, you can extract object labels and their coordinates
    # labels = result.names
    # coordinates = result.xyxy[0].cpu().numpy().tolist()

    
    # Do something with the labels and coordinates (e.g., create a response)
    # response_data = {"labels": labels, "coordinates": coordinates}

    return ''

if __name__ == "__main__":
    app.run(debug=True)