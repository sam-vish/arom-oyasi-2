#!/usr/bin/env bash
# Render the "Voice" concept's motion assets from source clips in footage/ (gitignored).
#
# Sources: 16-second 1080p clips from the Marching Orders conference (YouTube YrxzqftWxIg),
# named <prefix>_<second-in-source>.mp4. The hero reel (hero*.webm/mp4) and about/invite loops
# are V1's, cut from the Apostle's own messages. PREVIEW ONLY: swap for Voice of One TV b-roll
# before launch. Same filenames, rerun this script, done.
#
# Every shot: trim → crop (clears burned-in logos) → scale → soft film grade → 30fps, then the
# end is crossfaded into the start so the loop has no visible seam.
set -euo pipefail
cd "$(dirname "$0")/.."
SRC="${SRC:-footage}"
OUT="public/video"
TMP="${TMPDIR:-/tmp}/aao_voice_render"
mkdir -p "$OUT" "$TMP"
# Soft, slightly matte film look: lifted blacks, warm highlights, restrained saturation.
GRADE="eq=saturation=0.78:contrast=1.05,curves=all='0/0.035 0.5/0.5 1/0.975',colorbalance=rh=0.04:bh=-0.04:rs=0.02:bs=-0.03"
XF=0.6

# loop <name> <clip> <start> <dur> <cropW> <cropH> <cropX> <cropY> <W> <H>
loop() {
  local name=$1 clip=$2 ss=$3 dur=$4 cw=$5 ch=$6 cx=$7 cy=$8 W=$9 H=${10}
  ffmpeg -loglevel error -y -ss "$ss" -t "$dur" -i "$SRC/$clip.mp4" \
    -vf "crop=$cw:$ch:$cx:$cy,scale=$W:$H:flags=lanczos,fps=30,$GRADE,setsar=1,format=yuv420p" \
    -c:v libx264 -crf 12 -preset fast -an "$TMP/$name.raw.mp4"
  local L off
  L=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$TMP/$name.raw.mp4")
  off=$(python3 -c "print(round($L-2*$XF,3))")
  ffmpeg -loglevel error -y -i "$TMP/$name.raw.mp4" -filter_complex \
    "[0:v]split[a][b];[a]trim=start=$XF,setpts=PTS-STARTPTS[body];[b]trim=0:$XF,setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration=$XF:offset=$off,format=yuv420p[v]" \
    -map "[v]" -c:v libx264 -crf 12 -preset fast -an "$TMP/$name.loop.mp4"
}

# encode <name> <crf264> <crfvp9>: H.264 (faststart) + VP9 + poster
encode() {
  local name=$1
  ffmpeg -loglevel error -y -i "$TMP/$name.loop.mp4" -c:v libx264 -preset slow -crf "$2" -profile:v high -pix_fmt yuv420p -movflags +faststart -an "$OUT/$name.mp4"
  ffmpeg -loglevel error -y -i "$TMP/$name.loop.mp4" -c:v libvpx-vp9 -b:v 0 -crf "$3" -row-mt 1 -deadline good -cpu-used 2 -an "$OUT/$name.webm"
  ffmpeg -loglevel error -y -ss 1 -i "$TMP/$name.loop.mp4" -frames:v 1 -q:v 3 -update 1 "$OUT/$name-poster.jpg"
}

# Panels (16:9) and the portrait (4:5). In these sources the conference logo sits at x 120-480,
# y 80-160 and a cut-off "AMERICA" banner at x 1650-1760, so every crop starts below y 170 and
# ends before x 1640 (x 1540 for mo_9510, whose banner sits further left).
loop v-hall     mo_15568 0.3  7.0 1600 900 160 175 1280 720;  encode v-hall 30 42
loop v-choir    mo_6048  6.0  6.0 1440 810 200 230 1280 720;  encode v-choir 30 42
loop v-faces    mo_13836 0.5  8.0 1440 810 300 200 1280 720;  encode v-faces 30 42
loop v-light    mo_9510  4.6  4.6 1440 810 200 175 1280 720;  encode v-light 30 42
loop v-petals   mo_6914  10.2 5.6 1280 720 330 170 1280 720;  encode v-petals 29 41
loop v-apostle  mo_13836 10.3 5.4 720  900 440 170 720 900;   encode v-apostle 29 41

# Pills: tiny 5:2 loops that sit inside lines of text (rendered at 2x their largest CSS size)
loop p-hall     mo_15568 0.3  7.0 1500 600 300 330 400 160;  encode p-hall 30 44
loop p-choir    mo_6048  6.0  6.0 1300 520 300 250 400 160;  encode p-choir 30 44
loop p-faces    mo_13836 0.5  8.0 1200 480 360 330 400 160;  encode p-faces 30 44
loop p-apostle  mo_13836 10.3 5.4 700  280 490 170 400 160;  encode p-apostle 30 44
loop p-petals   mo_6914  10.2 5.6 1300 520 330 170 400 160;  encode p-petals 30 44
loop p-light    mo_9510  4.6  4.6 1300 520 330 180 400 160;  encode p-light 30 44

ls -la "$OUT"
