import os

for root, dirs, files in os.walk('e:\\Velora'):
    if 'node_modules' in root or '.git' in root or '.next' in root:
        continue
    for f in files:
        if f.lower().endswith('.mp4') or 'hero' in f.lower():
            p = os.path.join(root, f)
            print(f"{p} ({os.path.getsize(p)} bytes)")
