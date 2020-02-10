const fs = require('fs')
fs.writeFileSync('./.env', `SETLIST_API_KEY=${process.env.API_KEY}\n`);
