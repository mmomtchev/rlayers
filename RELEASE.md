# Release procedure

* Make sure CHANGELOG.md is up to date
* `npm version {major|minor|patch}`
* `npm run dist`
* `npm publish ./dist/rlayers.tar.gz`
