from sklearn.cluster import KMeans
from scipy.spatial.distance import cdist
import numpy as np

def cal(X):
  distortions = []
  K = range(1, 10)
  
  for k in K:
      # Building and fitting the model
      kmeanModel = KMeans(n_clusters=k).fit(X)
      kmeanModel.fit(X)
      distortions.append(sum(np.min(cdist(X, kmeanModel.cluster_centers_,
                                          'euclidean'), axis=1)) / X.shape[0] )
  return distortions