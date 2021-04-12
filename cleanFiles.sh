#!/bin/bash

filesToRm=(.package-lock.json.swp node_modules/.package-lock.json node_modules/ansi-align/node_modules/ansi-regex/ node_modules/ansi-align/node_modules/emoji-regex/ node_modules/ansi-align/node_modules/is-fullwidth-code-point/ node_modules/ansi-align/node_modules/strip-ansi/ node_modules/ansi-regex/index.d.ts node_modules/bl/ node_modules/bson/ node_modules/call-bind/ node_modules/core-util-is/ node_modules/cron-parser/ node_modules/date.js/ node_modules/debug/node_modules/ node_modules/define-properties/ node_modules/denque/ node_modules/function-bind/ node_modules/get-intrinsic/ node_modules/has-symbols/ node_modules/has/ node_modules/human-interval/ node_modules/inherits/ node_modules/is-fullwidth-code-point/index.d.ts node_modules/is-nan/ node_modules/isarray/ node_modules/luxon/ node_modules/memory-pager/ node_modules/moment-timezone/ node_modules/moment/ node_modules/mongodb/ node_modules/nodemon/node_modules/ node_modules/numbered/ node_modules/object-keys/ node_modules/optional-require/ node_modules/process-nextick-args/ node_modules/readable-stream/ node_modules/safe-buffer/ node_modules/saslprep/ node_modules/sparse-bitfield/ node_modules/string_decoder/ node_modules/util-deprecate/)

for file in "${filesToRm[@]}"
do
	rm -r ./$file
done
