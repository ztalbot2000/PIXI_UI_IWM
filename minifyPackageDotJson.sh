#! /bin/sh

if [ -f ./tools/bin/jsmin ]; then
   echo "Removing (for possible update) old tools/bin/jsmin"
   rm ./tools/bin/jsmin
fi
echo "Compiling jsmin -> gcc -o ./tools/src/jsmin.c -o ./tools/bin/jsmin"
gcc ./tools/src/jsmin.c -o ./tools/bin/jsmin

echo "minifying package.min.json"
cat ./package.min.json | ./tools/bin/jsmin > ./package.json
