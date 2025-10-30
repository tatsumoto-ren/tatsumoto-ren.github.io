#!/bin/bash

set -euo pipefail

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
	rm -rf -- _site || die "can't remove site dir"
	mkdir -p -- _site || die "can't create site dir"
	cp -v -R --parents -- \
		./index.* \
		./img \
		./not_found.* \
		./blog/* \
		_site/
	echo "Done."
}

main "$@"
