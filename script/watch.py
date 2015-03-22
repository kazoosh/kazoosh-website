import sys
import time
from watchdog.observers import Observer
import MdToJsonHandler

if len(sys.argv) < 3:
    print 'Please pass source and destination directory as arguments (e.g. python script/watcher.py content public_html/content). Arguments given: ', str(sys.argv)
    sys.exit()

sourceDir = sys.argv[1]
distDir = sys.argv[2]

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