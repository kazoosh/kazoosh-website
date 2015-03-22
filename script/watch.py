import sys
import os
import time
import json
from watchdog.observers import Observer
import MdToJsonHandler

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


sourceDir = config['contentSourceDirectory']
distDir = config['contentDestinationDirectory']

print 'source directory: '+sourceDir
print 'destination directory: '+distDir

if __name__ == "__main__":
    event_handler = MdToJsonHandler.MdToJsonHandler(sourceDir, distDir)
    observer = Observer()
    observer.schedule(event_handler, sourceDir, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()