#!/bin/bash

set -euo pipefail

# Docs:
# https://yandex.cloud/en/docs/storage/tools/rclone
# https://rclone.org/s3/

die() {
	echo "oops: $*"
	exit 1
}

git_no_differences() {
	git diff --quiet --exit-code
}

main() {
	[[ -d $PWD/.git ]] || die "started in a wrong directory: $PWD"
	git_no_differences || die "working tree is dirty"
	rclone -v sync --fast-list --checksum "$PWD/_site" "s3-connect:ajatt.top"
	echo "Done."
}

main "$@"
