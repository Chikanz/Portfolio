#!/bin/bash

# Convert all videos in the current directory to mp4
# Requires ffmpeg

bitrate_in="1500k"
minrate_in="1000k"
maxrate_in="3500k"

for video_in in *.mp4; do
    ffmpeg -i "$video_in" \
    -y \
    -an \
    -vcodec libvpx-vp9 \
    -crf 10 \
    -pix_fmt yuv420p \
    -deadline good \
    -b:v "$bitrate_in" -minrate "$minrate_in" -maxrate "$maxrate_in" \
    -pass 1 \
    -f webm /dev/null && \
ffmpeg -i "$video_in" \
    -y \
    -an \
    -vcodec libvpx-vp9 \
    -crf 10 \
    -pix_fmt yuv420p \
    -deadline good \
    -b:v "$bitrate_in" -minrate "$minrate_in" -maxrate "$maxrate_in" \
    -pass 2 \
    "${video_in%.*}.webm"

    echo -ne '\007'
done

echo -ne '\007'
echo -ne '\007'
echo -ne '\007'