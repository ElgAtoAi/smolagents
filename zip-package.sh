#!/bin/bash
set -e
npm run build
rm -f deploy.zip
zip -r deploy.zip dist worker wrangler.toml package.json > /dev/null
echo "deploy.zip created"
