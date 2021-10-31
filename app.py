# flask_ngrok_example.py
from flask import Flask, jsonify, request, render_template, send_from_directory
# from flask_ngrok import run_with_ngrok

app = Flask(__name__,  static_url_path='')
# run_with_ngrok(app)  
@app.route('/statics/<path:path>')
def send_js(path):
    return send_from_directory('templates', path)

@app.route("/")
def index():
    pagetitle = "HomePage"
    return render_template("index.html",
                            mytitle="Hanh",
                            mycontent="Hello World")
if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)