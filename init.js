#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

/*
    This script handles the following:
        - read package.json
        - create .env file
        - return uuid, guid, version

    can be called with the following external commands:
        - node init.js
        - node init.js generate
        - node init.js uuid
        - node init.js guid
        - node init.js versiom

    can be called with the following commands:
        - npm run init
        - npm run init:generate
        - npm run env-init
        - npm run env-uuid
        - npm run env-guid
        - npm run env-version
*/

const fs = require('fs');
const { v5: uuid } = require('uuid');

/*
 *    declrations > package.json
 */

const { version, repository } = JSON.parse(fs.readFileSync('package.json'));
const args = process.argv.slice(2, process.argv.length);
const action = args[0];
// const a       = args[ 1 ];
// const b       = args[ 2 ];

if (action === 'guid') {
    console.log(`${process.env.GUID}`);
} else if (action === 'setup') {
    fs.writeFileSync('.env', '', (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Wrote to .env successfully`);
        }
    });
} else if (action === 'generate') {
    const buildGuid = uuid(`${repository.url}`, uuid.URL);
    const buildUuid = uuid(version, buildGuid);

    const ids = `
VERSION=${version}
GUID=${buildGuid}
UUID=${buildUuid}
`;

    console.log(version);
    console.log(buildGuid);
    console.log(buildUuid);

    fs.writeFileSync('.env', ids, (err) => {
        if (err) {
            console.error(`Could not write env vars: ${err}`);
        } else {
            console.log(`Wrote env vars to .env`);
        }
    });
} else if (action === 'uuid') {
    console.log(`${process.env.UUID}`);
} else {
    console.log(version);
}

process.exit(0);
