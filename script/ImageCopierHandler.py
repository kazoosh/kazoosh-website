from watchdog.events import FileSystemEventHandler
import ImageCopier


class ImageCopierHandler(FileSystemEventHandler):

    def __init__(self, sourceDir, distDir):
        self.imageCopier = ImageCopier.ImageCopier()
        self.sourceDir = sourceDir
        self.distDir = distDir

    def on_modified(self, event):
        print event
        self.imageCopier.refreshDir(self.distDir)
        self.imageCopier.copy(self.sourceDir, self.distDir)