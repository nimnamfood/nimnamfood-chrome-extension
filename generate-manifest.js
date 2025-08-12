const fs = require('fs');

const manifestJSON = JSON.parse(fs.readFileSync('./manifest.template.json', 'utf-8'));
const matches = JSON.parse(fs.readFileSync('./matches.json', 'utf-8'));

manifestJSON.content_scripts[0].matches = matches;

fs.mkdirSync('./dist/nimnamfood-chrome-extension/browser', { recursive: true });
fs.writeFileSync('./dist/nimnamfood-chrome-extension/browser/manifest.json', JSON.stringify(manifestJSON));

console.log('✅ manifest.json generated successfully');
