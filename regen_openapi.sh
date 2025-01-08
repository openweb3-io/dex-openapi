#!/bin/sh

set -ex

yarn openapi-generator-cli generate -i openapi.json -g typescript-axios -o javascript/src -c javascript/openapi-generator-config.json --type-mappings=set=Array
