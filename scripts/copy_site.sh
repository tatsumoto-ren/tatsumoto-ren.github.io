#!/bin/bash

set -euo pipefail

# shellcheck source=scripts/lib.sh
. "$(dirname -- "$0")/lib.sh"

main() {
	ensure_git_repo
	git_no_differences || die "working tree is dirty"
	rm -rf -- _site || die "can't remove site dir"
	mkdir -p -- _site || die "can't create site dir"
	cp -v -R --parents -- \
		./index.* \
		./img \
		./res \
		./not_found.* \
		./robots.txt \
		./sitemap.xml \
		./blog/*.{html,md,rss,json} \
		./blog/{aud,img,res,vid}/* \
		_site/
	echo "Done."
}

main "$@"
