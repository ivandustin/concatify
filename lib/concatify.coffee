fs = require('fs')

# get current working directory
cwd = process.cwd()

# get concatify.json
configfile = require(cwd+'/concatify.json')

# set "pile" variable
pile = ""

# set a variable for processed filenames
processed = []

# create processFileSync function
processFileSync = (filename) ->
	# check if filename has beed processed already
	isProcessed = if processed.indexOf(filename) is -1 then false else true
	# skip if processed
	if isProcessed then return false
	# get contents
	contents = fs.readFileSync filename
	# add contents to the pile
	pile += contents
	# add the filename to the "processed"
	processed.push filename
	# return true
	true

# create a function that tells whether a given path is *
isAll = (path) ->
	if path.substr(-2, path.length) is '/*'
		return true
	false

# create a function that returns an array of filenames of a given directory
# note: only files, not directories
getFilesSync = (dir) ->
	filenames = []
	files = fs.readdirSync dir
	files = files.map (file) -> dir + '/' + file
	for file in files
		stat = fs.statSync file
		if stat.isFile()
			filenames.push file
	filenames

# create a function that will remove "/*" to the * path
removeStar = (path) ->
	if not isAll(path) then return path
	path.substring(0, path.length-2)

# start reading the "paths"
for path in configfile.paths
	# prepend cwd to the 'path'
	path = cwd + '/' + path
	# check if *
	if isAll(path)
		# remove star
		path = removeStar path
		# get files
		files = getFilesSync path
		# process files
		for file in files
			# process the file
			processFileSync file
	else
		file = path
		processFileSync file

# save the pile
fs.writeFileSync configfile.filename, pile