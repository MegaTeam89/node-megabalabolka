/**
 * Written By MegaT
 * 2022
 * Patch written in 2026 to fix all of the glaring issues oh my lord
 */

const { spawn } = require('child_process');

function generate(options) {
    return new Promise(function (resolve, reject) {
        let prompt = [];
        var list = false;
        var enableErrorLogs = true;
        if (options.enableErrorLogs == false) {
            enableErrorLogs = false;
        }
        if (options.list == true) {
            prompt.push(`-l`)
            list = true;
        }
        else {
            if (options.voice) {
                prompt.push(`-n`)
                prompt.push(`${options.voice}`)
            }
            if (options.text) {
                prompt.push(`-t`)
                prompt.push(`${options.text.replace(/["]+/g, '')}`)
            }
            if (options.speed) {
                prompt.push(`-s`)
                prompt.push(`${options.speed}`)
            }
            if (options.pitch) {
                prompt.push(`-p`)
                prompt.push(`${options.pitch}`)
            }
            if (options.volume) {
                prompt.push(`-v`)
                prompt.push(`${options.volume}`)
            }
            if (!options.writeToBuffer) {
                if (options.file) {
                    prompt.push(`-w`)
                    prompt.push(`${options.file}`)
                }
            } else {
                prompt.push(`-o`)
                if (options.ignoreLength)
                    prompt.push(`-il`)
                if (options.encoding) {
                    prompt.push(`--encoding`)
                    prompt.push(`${options.encoding}`)
                }
            }
            if (options.raw) {
                prompt.push(`--raw`)
            }
        }
        const ls = spawn(`balcon`, prompt);
        let buffers = [];
        ls.stdout.on("data", (b) => buffers.push(b));

        ls.stderr.on('data', function (data) {
            if (enableErrorLogs) {
                console.error('stderr: ' + data.toString());
            }
        });

        ls.stdout.on("end", async () => {
            if (list == false) {
                let res = Buffer.concat(buffers)
                return resolve(res);
            } else {
                let l = Buffer.concat(buffers).toString()
                //let l = Buffer.concat(buffers).toString().split("\r\n");
                //l.forEach((e, i)=> l[i] = e.trim());
                return resolve(l)
            }
        })

        ls.on('exit', function (code) {

        });
    })
}

module.exports = { generate };