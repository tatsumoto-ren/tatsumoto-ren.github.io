#!/bin/bash

set -euo pipefail
shopt -s nullglob

# shellcheck source=scripts/lib.sh
. "$(dirname -- "$0")/lib.sh"

# Validate a clean repository and copy only deployable static assets into _site.
main() {
	ensure_git_repo
	git_no_differences || die "working tree is dirty"
	rm -rf -- _site || die "can't remove site dir"
	mkdir -p -- _site || die "can't create site dir"
	# Exclude vitest.config.js from deployment.
	cp -v -R --parents -- \
		./*.html \
		./robots.txt \
		./sitemap.xml \
		./{img,res}/* \
		./{blog,ru}/*.{html,md,rss,json} \
		./{blog,ru}/{aud,img,res,vid}/* \
		_site/
	echo "Done."
}

main "$@"
