### Contact : [Nguyen Hanh](https://www.facebook.com/hanhgoogle)

## But how do K-Means Clustering works?

Let’s say you have some vector XX that contains nn data points. Running our algorithm consists of the following steps:

- Take random kk points (called centroids) from XX
- Assign every point to the closest centroid. The newly formed bunch of points is called cluster.
- For each cluster, find new centroid by calculating a new center from the points
- Repeat steps 2-3 until centroids stop changing
## How to use ?

### Clone 
```git clone https://github.com/hashcott/extracting-dominant-color-image.git```

### Install lib
```
pip install -r requirements.txt
```

### Run
```
flask run
```
### Ngrok special version
```
pip install git+https://github.com/gstaff/flask-ngrok
```
### Using localhost or ngrok to open it
