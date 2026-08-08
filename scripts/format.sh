#!/bin/bash

set -euo pipefail

readonly ROOT_DIR=$(git rev-parse --show-toplevel)

prettier -w "$ROOT_DIR/**/*.{css,js}"
