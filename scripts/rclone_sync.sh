#!/bin/bash

set -euo pipefail

# Docs:
# https://yandex.cloud/en/docs/storage/tools/rclone
# https://rclone.org/s3/

# shellcheck source=scripts/lib.sh
. "$(dirname -- "$0")/lib.sh"

main() {
	ensure_git_repo
	git_no_differences || die "working tree is dirty"
	rclone -v sync --fast-list --checksum "$PWD/_site" "s3-connect:ajatt.top"
	echo "Done."
}

main "$@"
