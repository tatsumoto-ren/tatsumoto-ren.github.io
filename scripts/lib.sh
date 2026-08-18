#!/bin/bash

# Shared shell library for scripts in this directory.
# Source from other scripts: . "$(dirname -- "$0")/lib.sh"

# Print a consistent fatal error and terminate the calling script.
die() {
	echo "oops: $*" >&2
	exit 1
}

# Return true when an executable command is available on PATH.
is_installed() {
	[[ -x $(command -v "$1") ]]
}

# Resolve a pnpm invocation: prefer pnpm on PATH, otherwise use Corepack.
# COREPACK_ENABLE_AUTO_PIN=0 prevents Corepack from adding a project pin.
pkgmgr() {
	if is_installed pnpm; then
		pnpm "$@"
	elif is_installed corepack; then
		COREPACK_ENABLE_AUTO_PIN=0 corepack pnpm "$@"
	else
		die "no pnpm or corepack found on PATH"
	fi
}

# Return true if the working tree has no changed files.
git_no_differences() {
	git diff --quiet --exit-code
	# alternative: [[ -z $(git status --porcelain --untracked-files=normal) ]]
}

# Fail unless the current directory is a git repository root.
ensure_git_repo() {
	[[ -d $PWD/.git ]] || die "must be run from project root"
}
