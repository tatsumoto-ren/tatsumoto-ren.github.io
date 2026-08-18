#!/bin/bash

set -euo pipefail

# shellcheck source=scripts/lib.sh
. "$(dirname -- "$0")/lib.sh"

ROOT_DIR=$(git rev-parse --show-toplevel)
readonly ROOT_DIR

# Prettier expands the glob internally; pkgmgr forwards it without a shell.
pkgmgr exec prettier -w "$ROOT_DIR/**/*.{css,js,ts}"
