import os

def find_file(filename, search_paths):
    for sp in search_paths:
        if not os.path.exists(sp):
            continue
        for root, dirs, files in os.walk(sp):
            for f in files:
                if filename.lower() in f.lower():
                    p = os.path.join(root, f)
                    print(f"FOUND: {p} ({os.path.getsize(p)} bytes)")

search_paths = [
    'e:\\Velora',
    'C:\\Users\\Jaku\\Downloads',
    'C:\\Users\\Jaku\\Desktop',
    'C:\\Users\\Jaku\\Videos',
    'C:\\Users\\Jaku\\Documents'
]

find_file('Hero_video', search_paths)
find_file('Hero', search_paths)
