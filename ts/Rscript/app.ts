/// <reference path="../build/linq.d.ts"/>

$ts.mode = Modes.debug;


const hello_world: string = `
let hello_word as function(word = ["world", 'R#', "GCModeller Users"]) {
    print(\`Hello \${word}!\`);
}

call hello_word();
`;