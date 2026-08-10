import os
import shutil

dest = 'e:\\Velora\\ai-website-cloner-template-master\\public\\assets\\hero_video.mp4'

# Check if e6d4015301694efa8f902f0cda720a9d.mp4 exists in e:\Velora\hero video
candidate1 = 'e:\\Velora\\hero video\\e6d4015301694efa8f902f0cda720a9d.mp4'
candidate2 = 'e:\\Velora\\велора\\e6d4015301694efa8f902f0cda720a9d.mp4'
candidate3 = 'C:\\Users\\Jaku\\Desktop\\ssstik.io_@mike.mozg_1782828804201.mp4'

src = None
if os.path.exists(candidate1):
    src = candidate1
elif os.path.exists(candidate2):
    src = candidate2
elif os.path.exists(candidate3):
    src = candidate3

if src:
    shutil.copy(src, dest)
    print(f"Successfully copied {src} ({os.path.getsize(src)} bytes) to {dest}")
else:
    print("Source video candidate not found")
