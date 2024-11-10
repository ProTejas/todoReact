const fileSystem = require('fs')

fileSystem.appendFile('tejasFirst.txt', "Bhai agaya tejas", function(err){
    if(err) console.log(err);
    else console.log("File created");
    
})