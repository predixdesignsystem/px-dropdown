'use strict';
// This node application vulcanizes and copies the files specified in the 'files' array to our CDN
//
// Usage:
//   node cdnify.js (-v <version>) (-d)
//
// Options:
//   -v (string) Version (optional, bower.json used if not provided).
//   -d (null)   Dry run (optional). Does everything but upload to the CDN.
//
// Dependencies:
//   process.env.AWS_ACCESS_KEY
//   process.env.AWS_SECRET_ACCESS_KEY
//   process.env.HTTP_PROXY

var args = require('minimist')(process.argv.slice(2), {'--':true,alias:{v:'version',d:'dryrun'}}),
    fs = require('fs-extra'),
    cdn = require('px-cdn');

// #######################################################
// CONFIGURATION

var options = {
  org: 'predixdev',
  name: fs.readJsonSync('./bower.json').name,
  version: args.v || fs.readJsonSync('./bower.json').version,
  dryrun: args.d,
  // Files that compose this component.
  // We need to specify these so we can rewrite all the relative
  // dependency paths to properly point to bower_components
  // before we vulcanize the whole thing into one file.
  files: [
    'css/px-dropdown-chevron.css',
    'css/px-dropdown-content.css',
    'css/px-dropdown-text.css',
    'css/px-dropdown.css',
    'px-dropdown.html',
    'px-dropdown-chevron.html',
    'px-dropdown-content.html',
    'px-dropdown-text.html'
  ]
};

// END CONFIGURATION
// #######################################################

// CDNify and upload the files in options.files
cdn.cdnify(options);
