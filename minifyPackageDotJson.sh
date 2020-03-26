#! /bin/sh

if [ ! -f ./tools/bin/jsmin ]; then
   rm ./tools/bin/jsmin
   echo "Compiling jsmin -> gcc -o ./tools/src/jsmin.c -o ./tools/bin/jsmin"
   gcc ./tools/src/jsmin.c -o ./tools/bin/jsmin
fi

echo "minifying package.min.json"
cat ./package.min.json | ./tools/bin/jsmin > ./package.json
