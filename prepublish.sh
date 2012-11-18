#!/usr/bin/env bash

npm test
git commit -am "Automatic commit for version $npm_package_version"
git tag $npm_package_version
git push
git push --tags
