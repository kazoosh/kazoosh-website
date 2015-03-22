from watchdog.events import FileSystemEventHandler
import MdToJsonConverter


class MdToJsonHandler(FileSystemEventHandler):

    def __init__(self, sourceDir, distDir):
        self.mdToJsonConverter = MdToJsonConverter.MdToJsonConverter()
        self.sourceDir = sourceDir
        self.distDir = distDir

    def on_modified(self, event):
        print event
        self.mdToJsonConverter.refreshDir(self.distDir)
        self.mdToJsonConverter.mdToJson(self.sourceDir, self.distDir, "")