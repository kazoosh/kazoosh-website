import sys
import os
import time
import json
from watchdog.observers import Observer
import MdToJsonHandler
import ImageCopierHandler


config_file_path = 'config.json'
local_config_file_path = 'config.local.json'

def merge_two_dicts(x, y):
    '''Given two dicts, merge them into a new dict as a shallow copy.'''
    z = x.copy()
    z.update(y)
    return z

if not os.path.isfile(config_file_path):
    print 'Please specify config data in: '+config_file_path
    sys.exit()
else:
    print 'Loading config data: '+config_file_path
    with open(config_file_path) as config_file:
        config = json.load(config_file)

if not os.path.isfile(local_config_file_path):
    print 'You may specify local config data in: '+local_config_file_path
else:
    print 'Loading and merging local config data: '+local_config_file_path
    with open(local_config_file_path) as local_config_file:
        local_config = json.load(local_config_file)
    config = merge_two_dicts(config, local_config);


contentSourceDir = config['contentSourceDirectory']
contentDistDir = config['contentDestinationDirectory']
imgSourceDir = config['imagesSourceDirectory']
imgDistDir = config['imagesDestinationDirectory']

print 'content source directory: '+contentSourceDir
print 'content destination directory: '+contentDistDir
print 'image source directory: '+imgSourceDir
print 'image destination directory: '+imgDistDir

if __name__ == "__main__":
    md_to_json_handler = MdToJsonHandler.MdToJsonHandler(contentSourceDir, contentDistDir)
    image_copier_handler = ImageCopierHandler.ImageCopierHandler(imgSourceDir, imgDistDir)
    observer = Observer()
    observer.schedule(md_to_json_handler, contentSourceDir, recursive=True)
    observer.schedule(image_copier_handler, imgSourceDir, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()