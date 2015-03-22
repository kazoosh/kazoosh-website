import os
import shutil
import distutils.dir_util


class ImageCopier:

	def refreshDir(self, dir):
		if os.path.exists(dir):
			shutil.rmtree(dir)
		if not os.path.exists(dir):
			os.makedirs(dir)

	def copy(self, sourceDir, distDir):
		distutils.dir_util._path_created = {}
		distutils.dir_util.copy_tree(sourceDir, distDir)