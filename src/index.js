var fs = require('fs');
var app = require('electron').remote;
var dialog = app.dialog;


document.getElementById('btn_copy_to_new_file').addEventListener('click', function () {
    // check pattern
    var originalPatten = document.getElementById('original_name_pattern').value;
    var origin = originalPatten.split("*");
    if (!origin || origin.length !== 2) {
        console.error("original pattern not set");
        return;
    }
    var newPattern = document.getElementById('new_name_pattern').value;
    var newone = newPattern.split("*");
    if (!newone || newone.length !== 2) {
        console.error("new pattern not set");
        return;
    }

    // load path
    var dir = getDirectoryFromInput();
    if (!dir) {
        console.error("path not found");
        return;
    }
    console.log(dir.path);

    fs.readdir(dir.path, function (err, files) {
        if (err) {
            console.error(err);
            return;
        }

        console.log(files.length);

        files.forEach(function (file) {
            console.log(file);
            var path = dir.path + '/' + file;
            console.log(path);
            if (fs.lstatSync(path).isDirectory()) {
                console.log('directory:' + file);
            } else {

                console.log('file:' + file);
                if (file.indexOf(origin[0]) !== -1) {
                    console.log('match: renaming file...');
                    var removePrefix = file.split(origin[0]);
                    var removeSuffix = removePrefix[1].split(origin[1]);
                    var newPath = dir.path+'/'+newone[0]+removeSuffix[0]+newone[1];
                    console.log('new path: '+newPath);
                    fs.createReadStream(path).pipe(fs.createWriteStream(newPath));
                }

            }
        })


    });


});

function getDirectoryFromInput() {
    var dirPath = document.getElementById('input_directory').files[0];
    return dirPath;
}

