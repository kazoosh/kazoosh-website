import os
import time
import shutil
import frontmatter
import json
import yaml.composer


class MdToJsonConverter:

	DATE_FORMAT = '%Y-%m-%d %H:%M:%S'
	defaultLanguage = 'de'
	languages = ['en']

	def refreshDir(self, dir):
		if os.path.exists(dir):
			shutil.rmtree(dir)
		if not os.path.exists(dir):
			os.makedirs(dir)

	def __markdownToDict(self, markdownFilePath):
		try:
			markdownData = frontmatter.load(markdownFilePath)
			markdownDict = markdownData.to_dict()
		except yaml.composer.ComposerError, e:

			print 'ComposerError > Exception for: '+markdownFilePath
			print e

			markdownDict = {}
			markdownDict['content'] = 'Fehler im Markdown Header: '+str(e)

		except Exception, e:
			print 'Exception for: '+markdownFilePath
			print e

			markdownDict = {}
			markdownDict['content'] = str(e)
		
		return markdownDict

	def __dictToJson(self, markdownDict, jsonFilePath):
		#print jsonFilePath
		jsonFile = open(jsonFilePath, 'w')
		json.dump(markdownDict, jsonFile, indent=4)
		jsonFile.close()

	def __addSubpagePaths(self, markdownDict, sourceDir, subDir):
		markdownDict['subpages'] = []
		normalizedSubDir = self.__removeDirLanguagePrefix(subDir, self.languages)
		subDirlanguage = self.__getDirLanguagePrefix(subDir, self.languages)
		if os.path.isdir(os.path.join(sourceDir, normalizedSubDir)):
			for subFileName in os.listdir(os.path.join(sourceDir, normalizedSubDir)):
				if self.__isFile(os.path.join(sourceDir, normalizedSubDir), subFileName):
					subFileNameLanguage = self.__getFileLanguagePrefix(subFileName, self.languages)
					if subDirlanguage == subFileNameLanguage:
						normalizedSubFileName = self.__removeFileLanguagePrefix(subFileName, self.languages)
						subFilePath = os.path.join(normalizedSubDir, os.path.splitext(normalizedSubFileName)[0])
						subFilePath = os.path.join(*subFilePath.split('/')[0:]) # what dies this line do??????
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

	def __removeDirLanguagePrefix(self, dirName, languages):
		return self.__removeLanguagePrefix(dirName, languages, '_', '', '')

	def __removeFileLanguagePrefix(self, fileName, languages):
		return self.__removeLanguagePrefix(fileName, languages, '_', '.md', '.md')

	def __removeLanguagePrefix(self, name, languages, findSufix, findPrefix, replace):
		normalizedName = name
		for index, language in enumerate(languages):
			normalizedName = self.__rreplace(normalizedName, findSufix + language + findPrefix, replace)
		return normalizedName

	def __getDirLanguagePrefix(self, dirName, languages):
		return self.__getLanguagePrefix(dirName, languages, '_', '')

	def __getFileLanguagePrefix(self, fileName, languages):
		return self.__getLanguagePrefix(fileName, languages, '_', '.md')

	def __getLanguagePrefix(self, name, languages, findSufix, findPrefix):
		for index, language in enumerate(languages):
			if name.find(findSufix + language + findPrefix) >= 0:
				return language;
		return self.defaultLanguage

	# replace string right to left
	def __rreplace(self, string, old, new):
		maxSplit = 1
		li = string.rsplit(old, maxSplit)
		return new.join(li)

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