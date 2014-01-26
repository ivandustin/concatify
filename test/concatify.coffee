fs = require('fs')
assert = require('assert')

filetxt = __dirname + '/file.txt'

require('../lib/concatify')
# check if the file.txt contains 'abc'
content = fs.readFileSync(filetxt).toString()
assert content is 'abc'