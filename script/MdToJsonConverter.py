import os
import time
import shutil
import frontmatter
import json


class MdToJsonConverter:

	DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

	def refreshDir(self, dir):
		if os.path.exists(dir):
			shutil.rmtree(dir)
		if not os.path.exists(dir):
			os.makedirs(dir)

	def __markdownToDict(self, markdownFilePath):
		markdownData = frontmatter.load(markdownFilePath)
		markdownDict = markdownData.to_dict()
		# convert markdown to html here already: http://pythonhosted.org//Markdown/siteindex.html
		return markdownDict

	def __dictToJson(self, markdownDict, jsonFilePath):
		#print jsonFilePath
		jsonFile = open(jsonFilePath, 'w')
		json.dump(markdownDict, jsonFile, indent=4)
		jsonFile.close()

	def __addSubpagePaths(self, markdownDict, sourceDir, subDir):
		markdownDict['subpages'] = []
		if os.path.isdir(os.path.join(sourceDir, subDir)):
			for subFileName in os.listdir(os.path.join(sourceDir, subDir)):
				if self.__isFile(os.path.join(sourceDir, subDir), subFileName):
					subFilePath = os.path.join(subDir, os.path.splitext(subFileName)[0])
					subFilePath = os.path.join(*subFilePath.split("/")[0:])
					markdownDict['subpages'].append(subFilePath)

	def __addLastModifiedTime(self, markdownDict, filePath):
		if 'last-modified' not in markdownDict:
			lastModified = time.strftime(self.DATE_FORMAT, time.localtime(os.stat(filePath).st_mtime))
			markdownDict['last-modified'] = lastModified

	def __addCreatedTime(self, markdownDict, filePath):
		if 'created' not in markdownDict:
			created = time.strftime(self.DATE_FORMAT, time.localtime(os.stat(filePath).st_birthtime))
			markdownDict['created'] = created

	def __isFile(self, sourceDir, fileName):
		return os.path.isfile(os.path.join(sourceDir, fileName)) and not fileName.startswith('.')

	def __isDir(self, sourceDir, fileName):
		return os.path.isdir(os.path.join(sourceDir, fileName))

	def mdToJson(self, sourceDir, distDir, currentSubDir):

		sourceDirPath = os.path.join(sourceDir, currentSubDir)
		distDirPath = os.path.join(distDir, currentSubDir)

		for fileName in os.listdir(sourceDirPath):
			
			#print os.path.join(sourceDirPath, fileName)

			if self.__isFile(sourceDirPath, fileName):

				markdownDict = self.__markdownToDict(os.path.join(sourceDirPath, fileName))

				if not os.path.exists(distDirPath):
					os.makedirs(distDirPath)

				fileNameWithoutExt = os.path.splitext(fileName)[0]
				self.__addSubpagePaths(markdownDict, sourceDir, os.path.join(currentSubDir, fileNameWithoutExt))
				self.__addLastModifiedTime(markdownDict, os.path.join(sourceDirPath, fileName))
				#addCreatedTime(markdownDict, os.path.join(sourceDirPath, fileName))

				self.__dictToJson(markdownDict, os.path.join(distDirPath, fileNameWithoutExt+'.json'))

			if self.__isDir(sourceDirPath, fileName):

				self.mdToJson(sourceDir, distDir, os.path.join(currentSubDir, fileName))



