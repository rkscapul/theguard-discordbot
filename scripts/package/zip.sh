#!/bin/sh

echo "[Host] Compressing dist folder..."
mkdir build;
tar -czvf ./build/build.tar.gz src config runtime package.json;