import os

user_dir = 'C:\\Users\\Jaku'
search_dirs = [os.path.join(user_dir, 'Downloads'), os.path.join(user_dir, 'Desktop')]

for d in search_dirs:
    if os.path.exists(d):
        for f in os.listdir(d):
            if 'hero' in f.lower() or f.lower().endswith('.mp4'):
                p = os.path.join(d, f)
                if os.path.isfile(p):
                    print(f"{p} ({os.path.getsize(p)} bytes)")
