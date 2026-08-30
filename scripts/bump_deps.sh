#!/bin/bash

# Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
# License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

# Bump all dependencies in package.json to their latest published versions
# and regenerate pnpm-lock.yaml.

set -euo pipefail

# shellcheck source=scripts/lib.sh
. "$(dirname -- "$0")/lib.sh"

# Validate the project root before updating every development dependency and lockfile.
main() {
	ensure_git_repo
	[[ -f package.json ]] || die "package.json not found"

	echo "Updating dependencies to latest..."
	pkgmgr update --latest

	echo "Done. Review the changes and commit manually."
}

main "$@"
