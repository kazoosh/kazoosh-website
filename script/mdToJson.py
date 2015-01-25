import os
import shutil
import frontmatter
import json



sourceDir = 'content2/'
distDir = 'public_html'



shutil.rmtree(os.path.join(distDir, sourceDir))
os.makedirs(os.path.join(distDir, sourceDir))


def markdownToDict(markdownFilePath):
	markdownData = frontmatter.load(markdownFilePath)
	markdownDict = markdownData.to_dict()
	# convert markdown to html here already: http://pythonhosted.org//Markdown/siteindex.html
	return markdownDict

def dictToJson(markdownDict, jsonFilePath):
	jsonFile = open(jsonFilePath, 'w')
	json.dump(markdownDict, jsonFile, indent=4)
	jsonFile.close()

def addSubpagePaths(markdownDict, subDir):
	markdownDict['subpages'] = []
	if os.path.isdir(subDir):
		for subFileName in os.listdir(subDir):
			if isFile(subDir, subFileName):
				subFilePath = os.path.join(subDir, os.path.splitext(subFileName)[0])
				subFilePath = os.path.join(*subFilePath.split("/")[1:])
				markdownDict['subpages'].append(subFilePath)

def convertSubpages(subDir):
	if os.path.isdir(subDir):
		for subFileName in os.listdir(subDir):
			if isFile(subDir, subFileName):
				
				markdownDict = markdownToDict(os.path.join(subDir, subFileName))
				if not os.path.exists(os.path.join(distDir, subDir)):
					os.makedirs(os.path.join(distDir, subDir))

				subFileNameWithoutExt = os.path.splitext(subFileName)[0]
				dictToJson(markdownDict, os.path.join(distDir, subDir, subFileNameWithoutExt+'.json'))
					


def isFile(sourceDir, fileName):
	return os.path.isfile(os.path.join(sourceDir, fileName)) and not fileName.startswith('.')


for fileName in os.listdir(sourceDir):
	
	fileNameWithoutExt = os.path.splitext(fileName)[0]

	if isFile(sourceDir, fileName):

		markdownDict = markdownToDict(os.path.join(sourceDir, fileName))

		addSubpagePaths(markdownDict, os.path.join(sourceDir, fileNameWithoutExt))

		dictToJson(markdownDict, os.path.join(distDir, sourceDir, fileNameWithoutExt+'.json'))

	convertSubpages(os.path.join(sourceDir, fileNameWithoutExt));


