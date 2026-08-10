import os
import shutil

dest = 'e:\\Velora\\ai-website-cloner-template-master\\public\\assets\\logo.png'

search_paths = [
    'e:\\Velora',
    'e:\\Velora\\hero video',
    'e:\\Velora\\велора',
    'C:\\Users\\Jaku\\Downloads',
    'C:\\Users\\Jaku\\Desktop'
]

found = None
for sp in search_paths:
    if not os.path.exists(sp):
        continue
    for root, dirs, files in os.walk(sp):
        for f in files:
            if 'logo' in f.lower() and (f.lower().endswith('.png') or f.lower().endswith('.jpg') or f.lower().endswith('.webp')):
                p = os.path.join(root, f)
                sz = os.path.getsize(p)
                print(f"FOUND LOGO: {p} ({sz} bytes)")
                if not found:
                    found = p

if found:
    shutil.copy(found, dest)
    print(f"Copied {found} to {dest}")
else:
    print("Logo file not found!")
