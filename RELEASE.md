# Release procedure

* Make sure CHANGELOG.md is up to date
* `npm version {major|minor|patch}`
* Publish the release on Github
* `npm run dist`
* `npm publish ./dist/rlayers.tar.gz`
