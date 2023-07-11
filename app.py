import json
from flask import Flask, render_template, url_for
#app = Flask(__name__,template_folder='templates')
app = Flask(__name__)
# 1. Define what to do when a user hits the index route


@app.route("/")
def index():
    print("Server received request for 'index' page...")
    path = "static/data/volcano_data.geojson"
    # Read GeoJSON data from file
    with open(path) as file:
        geojson_data = json.load(file)
    return render_template('index.html',geojson_data=geojson_data)

if __name__ == '__main__':
    app.debug = True
    app.run()