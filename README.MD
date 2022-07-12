# Mega Balabolka! The node.js Library

This package (or library) allows you to communicate with Balabolka's Console Application (balcon) for use in your nodejs application.

## Installation

Via npm:
```sh
$ npm install node-megabalabolka
```

## Prerequisites

In order to use this library, you must have balcon added to your PATH.<br />
You can download balcon by clicking [here](http://www.cross-plus-a.com/balcon.zip).

## Usage

Usage for basic generation, output will be in the WAV format.

```js
const balcon = require('node-megabalabolka')

options = {
    list: false,
    warnings: true,
    writeToBuffer: false,
    ignoreLength: false,
    raw: false,
    encoding: false,
    pitch: 0,
    speed: 0,
    voice: "Microsoft David Desktop",
    volume: "100",
    text: "This is an example of mega balabolka generation.",
    file: `${Math.round(Date.now() / 1000)}.wav`
}
balcon.generate(options).then(a => {
    if (options.writeToBuffer == true) {
        console.log("BufferLength:" + a.length)
    }
}).catch(error => {
    console.error(error)
    return false;
})
```

## Inputs
All inputs are handled by passing them through an Object. <br />
Those inputs are as followed:

### list:
Assignments: Can be set to true or false.<br />
Usage: will ignore all other commands and be used to list voices

### warnings:
Assignments: Can be set to true or false.<br />
Usage: will log all warning sent out

### writetoBuffer:
Assignments: Can be set to true or false.<br />
Usage: Passes the command -o and will write all sounddata to STDOUT to be used later in a buffer.

### ignoreLength:
Assignments: Can be set to true or false.<br />
Usage: Passes along an -il command to balcon which [omits the length of data in the WAV header](http://www.cross-plus-a.com/bconsole.htm).

### raw:
Assignments: Can be set to true or false.<br />
Usage: Output will contain raw PCM although this might only work in [SAPI 5](http://www.cross-plus-a.com/bconsole.htm)

### encoding:
Assignments: Can be set to utf8, ansi, or unicode.<br />
Usage: Output will be encoded to use either three encoding formats.

### pitch:
Assignments: Interger.<br />
Usage: Sets the pitch of the voice.

### speed:
Assignments: Interger.<br />
Usage: Sets the speed of the voice.

### volume:
Assignments: Interger.<br />
Usage: Sets the volume of the voice.

### text:
Assignments: String.<br />
Usage: Sets the text that will be generated.

### file:
Assignments: String.<br />
Usage: Sets the filename and/or path that will be used to write the generation to disc.
Will be ignored if `writeToBuffer` is true.

### voice:
Assignments: Text.<br />
Usage: Sets the voice being used the generate the text.<br /> 
you can find out what voices you have installed on your computer by running `balcon -l`