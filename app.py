# flask_ngrok_example.py
from flask import Flask, jsonify, request, render_template, send_from_directory
from werkzeug.utils import secure_filename
import kmean as KMeans
# from flask_ngrok import run_with_ngrok
  
app = Flask(__name__,  static_url_path='')
app.config['UPLOAD_FOLDER'] = "statics/image/"

# run_with_ngrok(app)  
@app.route('/statics/<path:path>')
def send_js(path):
    return send_from_directory('templates', path)

@app.route("/")
def index():
    return render_template("index.html")

# Route xử lý cụm
@app.route("/cluster", methods=['POST'])
def cluster():
  image = request.files['image'] 
  image.save(app.config['UPLOAD_FOLDER'] + secure_filename(image.filename))
  colors = KMeans.get_colors(app.config['UPLOAD_FOLDER'] + secure_filename(image.filename), n_colors=2)
  return jsonify(colors)

# Route xử lý get-colors
@app.route("/get-colors", methods=['POST'])
def getColors():
  image = request.files['image'] 
  image.save(app.config['UPLOAD_FOLDER'] + secure_filename(image.filename))
  colors = KMeans.get_colors(app.config['UPLOAD_FOLDER'] + secure_filename(image.filename), n_colors=2)
  return jsonify(colors)
  
if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)