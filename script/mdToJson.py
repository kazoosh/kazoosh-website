import sys
import MdToJsonConverter

if len(sys.argv) < 3:
	print 'Please pass source and destination directory as arguments (e.g. python script/mdToJson.py content public_html/content). Arguments given: ', str(sys.argv)
	sys.exit()

sourceDir = sys.argv[1]
distDir = sys.argv[2]

print 'source directory: '+sourceDir
print 'destination directory: '+distDir

mdToJsonConverter = MdToJsonConverter.MdToJsonConverter()


mdToJsonConverter.refreshDir(distDir)
mdToJsonConverter.mdToJson(sourceDir, distDir, "")

