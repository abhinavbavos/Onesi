const fs = require('fs');
let html = fs.readFileSync('Index.html', 'utf8');

// The groups of images
let sfdIndex = html.indexOf('<div class="snapshot-card"><img src="SFD.jpeg"');
let dryer1Index = html.indexOf('<div class="snapshot-card"><img src="dryer1.jpeg"');
let dryer5Index = html.indexOf('<div class="snapshot-card"><img src="dryer5.jpeg"');
let endIndex = html.indexOf('</div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class="achievement-item">', dryer5Index);

if (endIndex === -1) {
    endIndex = html.indexOf('</div>\n                                    </div>\n                                </div>\n                                <div class="achievement-item">', dryer5Index);
}

let p1 = html.substring(sfdIndex, dryer1Index); // SFD to SFD3
let p2 = html.substring(dryer1Index, dryer5Index); // dryer1 to dryer4
let p3 = html.substring(dryer5Index, endIndex); // dryer5 to dryer11

// The start of the snapshots-row
let rowStart = html.lastIndexOf('<div class="snapshots-row">', sfdIndex);

let pre = html.substring(0, rowStart);
let post = html.substring(endIndex);

let newHtml = pre +
    '<div class="snapshots-row">\n' + p3 +
    '</div>\n<div class="snapshots-row">\n' + p2 +
    '</div>\n<div class="snapshots-row">\n' + p1 +
    post;

fs.writeFileSync('Index.html', newHtml, 'utf8');
console.log('Reordered successfully!');
