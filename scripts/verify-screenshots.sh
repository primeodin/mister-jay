#!/usr/bin/env bash
set -euo pipefail
OUT="${1:-/workspace/verify-shots}"
BASE="${2:-http://127.0.0.1:4173/mister-jay}"
mkdir -p "$OUT"
CHROME_FLAGS=(
  --headless=new
  --disable-gpu
  --use-gl=swiftshader
  --enable-unsafe-swiftshader
  --enable-webgl
  --user-data-dir=/tmp/chrome-shot-$$
  --virtual-time-budget=25000
  --run-all-compositor-stages-before-draw
  --hide-scrollbars
  --no-sandbox
)

shot() {
  local w="$1" h="$2" file="$3" url="$4"
  echo "→ $file (${w}x${h})"
  google-chrome "${CHROME_FLAGS[@]}" \
    --window-size="${w},${h}" \
    --screenshot="${OUT}/${file}" \
    "${url}" 2>/dev/null || true
}

shot 1440 900 tire-1440.png "${BASE}/sketch/change-tire"
shot 1440 900 learn-1440.png "${BASE}/sketch/change-tire/learn"
shot 390 844 tire-390.png "${BASE}/sketch/change-tire"
shot 1440 900 home-1440.png "${BASE}/"
ls -la "$OUT"
