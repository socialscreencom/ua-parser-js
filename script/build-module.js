#!/usr/bin/env node
/* jshint esversion: 6 */ 
const fs = require('fs');
const PATH = {
    main : {
        src : 'src/main/ua-parser.js',
        dest : 'src/main/ua-parser.mjs',
        title : ''
    },
    enums : {
        src : 'src/enums/ua-parser-enums.js',
        dest :'src/enums/ua-parser-enums.mjs',
        title : 'enums'
    },
    extensions : {
        src : 'src/extensions/ua-parser-extensions.js',
        dest : 'src/extensions/ua-parser-extensions.mjs',
        title : 'extensions'
    }
};
const generateMJS = (module, replacers) => {
    const { src, dest, title } = PATH[module];
    let text = fs.readFileSync(src, 'utf-8');
    replacers.forEach(replacer => {
        text = text.replace(replacer[0], replacer[1]);
    });

    console.log(`Generate ${dest}`);

    fs.writeFileSync(dest,
`// Generated ESM version of UAParser.js ${title}
// DO NOT EDIT THIS FILE!
// Source: /${src}

${text}`, 'utf-8');
};

// ua-parser.mjs
generateMJS('main', [
    [/\(func[\s\S]+strict\';/ig, ''],
    [/esversion\: 3/ig, 'esversion: 6'],
    [/\/[\/\s]+export[\s\S]+/ig,'export {UAParser};']
]);

// ua-parser-enum.mjs
generateMJS('enums', [[/module\.exports =/ig, 'export']]);

// ua-parser-extension.mjs
generateMJS('extensions', [[/module\.exports =/ig, 'export']]);