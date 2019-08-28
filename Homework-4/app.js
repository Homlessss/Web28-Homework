var argv = process.argv.slice(2);
var fs = require('fs');

if (argv && argv.length >= 2) {
    var fileInput = argv[0];
    var fileOutput = argv[1];

    readFileAsync(fileInput, function (err, data) {
        if (err) {
            throw err;
        } else {
            var objData = convertDataToObject(data.toString());
            writeToFileOutput(fileOutput, objData)
        }
    })

} else {
    console.log('ERROR');
}

function convertDataToObject(data) {
    var arrData = data.split('\r\n');
    var objData = {}

    arrData.map(data => {
        var arr = data.split(' ');
        var key = arr[0];
        var value = Number(arr[1]);
        if (!objData[key]) {
            objData = {
                ...objData,
                [key]: value
            };
        } else {
            objData[key] += value;
        }
    })

    return objData;
}

function writeToFileOutput(fileOutput, objData) {
    var output = '';
    for (var key in objData) {
        output = output + [key] + ' ' + objData[key] + '\r\n';
    }

    var fileOutputWriteStream = fs.createWriteStream(fileOutput);
    fileOutputWriteStream.write(output);
}

function readFileAsync(fileName, cb) {
    fs.readFile(fileName, cb);
}