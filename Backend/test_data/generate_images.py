import urllib.request
import os

folder = 'images'
os.makedirs(folder, exist_ok=True)

urls = [
    ("room.jpg", "https://picsum.photos/800/600?random=1"),
    ("service.jpg", "https://picsum.photos/800/600?random=2"),
    ("combo.jpg", "https://picsum.photos/800/600?random=3")
]

for filename, url in urls:
    path = os.path.join(folder, filename)
    urllib.request.urlretrieve(url, path)
    print(f"Downloaded {filename}")
