#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT_DIR="$DIR/.."
TMP_DIR="$ROOT_DIR/tmp"
AWS_DIR="$ROOT_DIR/aws"
NODE_MODULES_DIR="$ROOT_DIR/node_modules"
FUNCTIONS_DIR="$ROOT_DIR/pages/api"
FUNCTION_FILE="function.zip"

rm -rf $TMP_DIR
mkdir $TMP_DIR
cp -r $AWS_DIR/* $TMP_DIR/
cp -r $FUNCTIONS_DIR/check.js $TMP_DIR/
mkdir -p $TMP_DIR/node_modules
cp -r $NODE_MODULES_DIR/node-fetch $TMP_DIR/node_modules/

cd $TMP_DIR
rm -rf $FUNCTION_FILE
zip -r $FUNCTION_FILE .
cd $ROOT_DIR

aws lambda update-function-code --function-name psn-id-checker-function --zip-file fileb://"$TMP_DIR/$FUNCTION_FILE"