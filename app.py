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

    elbow = KMeans.get_elbow(
        app.config['UPLOAD_FOLDER'] + secure_filename(image.filename))

    k = 1 
    max = -1
    for i in range(0, len(elbow)):
      if(i == len(elbow) - 1):
        break
      temp = elbow[i] - elbow[i+1]
      print(temp)
      if(temp > max):
        max = temp
        k = i + 1 + 1
    return jsonify(k)


# Route xử lý get-colors
@app.route("/get-colors", methods=['POST'])
def getColors():
    image = request.files['image']
    cluster = request.form.get('cluster')

    image.save(app.config['UPLOAD_FOLDER'] + secure_filename(image.filename))
    colors = KMeans.get_colors(
        app.config['UPLOAD_FOLDER'] + secure_filename(image.filename), n_colors=int(cluster))
    return jsonify(colors)


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
