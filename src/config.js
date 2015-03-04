/* config.js */

import fs from 'fs';

// load config from /etc/esthry/esthry.json
var config = JSON.parse(fs.readFileSync('/etc/esthry/esthry.json'));

export default config;
