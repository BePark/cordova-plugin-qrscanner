var exec = require('child_process').exec;

var deferral;

const workingDir = 'plugins/cordova-plugin-qrscanner';

var build = function() {
    console.log('Building cordova-plugin-qrscanner...');
    exec('npm run build', {cwd: workingDir}, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('cordova-plugin-qrscanner BUILD FAIL');
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            console.log('exec error: ' + error);
            deferral.reject(err);
        }
        console.log('cordova-plugin-qrscanner BUILD SUCCESS');
        deferral.resolve();
    });        
}

var installDependencies = function() {
    console.log('Installing cordova-plugin-qrscanner dependencies...');
    exec('npm install', {cwd: workingDir}, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('cordova-plugin-qrscanner BUILD FAIL');
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            console.log('exec error: ' + error);
            deferral.reject(err);
        } else {
            build();
        }
    });
};

module.exports = function(ctx) {
    deferral = ctx.requireCordovaModule('q').defer();
    installDependencies();
    return deferral.promise;
};