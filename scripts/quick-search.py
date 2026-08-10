import os

def search():
    for root, dirs, files in os.walk('e:\\Velora'):
        for f in files:
            if 'hero' in f.lower() or f.lower().endswith('.mp4') or 'video' in f.lower():
                p = os.path.join(root, f)
                sz = os.path.getsize(p)
                print(f"{f} -> {p} ({sz} bytes)")

search()
