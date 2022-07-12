/**
 * Written By MegaT
 * 2022
 */

const { exec } = require('child_process');

function generate(options) {
    return new Promise(function (resolve, reject) {
        var prompt;
        var list = false;
        if (options.list == true) {
            prompt = `balcon -l`
            list = true;
        }
        else {
            prompt = `balcon`;
            if (options.voice) {
                prompt += ` -n "${options.voice}" `
            }
            if (options.text) {
                prompt += `-t "${options.text.replace(/["]+/g, '')}" `
            }
            if (options.speed) {
                prompt += `-s "${options.speed}" `
            }
            if (options.pitch) {
                prompt += `-p "${options.pitch}" `
            }
            if (options.volume) {
                prompt += `-v "${options.volume}" `
            }
            if (!options.writeToBuffer) {
                if (options.file) {
                    prompt += `-w "${options.file}" `
                }
            } else {
                prompt += `-o`
                if (options.ignoreLength)
                    prompt += ` -il`
                if (options.encoding) {
                    prompt += ` --encoding ${options.encoding}`
                }
            }
            if (options.raw) {
                prompt += ` --raw`
            }
        }
        const ls = exec(prompt, function (error, stdout, stderr) {
            if (error) {
                console.log('STDERR: ' + stderr);
                console.error(error.stack);
                console.error('Error code: ' + error.code);
                console.error('Signal received: ' + error.signal);
                reject(stderr);
            }
            if (options.warnings) {
                if (stderr)
                    console.log('Warning: ' + stderr);
            }
            if (list = true) {
                resolve(stdout);
            }
        });

        ls.on('exit', function (code) {
        })
    })
}

module.exports = { generate };