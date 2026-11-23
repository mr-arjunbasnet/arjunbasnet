#!/usr/bin/env python3
"""
Prepare images for the Sagarmatha College "AI or Not?" game.

Usage:
    python3 scripts/sagarmatha-images.py ai   path/to/ai-images/*
    python3 scripts/sagarmatha-images.py real path/to/real-photos/*

Each file is cropped to 4:3 at 1200x900, re-encoded as JPEG WITHOUT metadata
(EXIF would give real photos away to anyone who checks), given a random hex
name, and saved to public/ai-training/sagarmatha-college/aion/. The script
prints one POOL entry per image: paste them into src/lib/sagarmatha/images.ts
and write a one-sentence `tell` for each.

Needs Pillow:  python3 -m pip install Pillow
"""
import os
import secrets
import sys

from PIL import Image, ImageOps

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "ai-training", "sagarmatha-college", "aion")


def main() -> None:
    if len(sys.argv) < 3 or sys.argv[1] not in ("ai", "real"):
        sys.exit(__doc__)
    truth, files = sys.argv[1], sys.argv[2:]
    os.makedirs(OUT, exist_ok=True)
    for n, path in enumerate(files, 1):
        im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
        im = ImageOps.fit(im, (1200, 900), Image.LANCZOS)
        name = secrets.token_hex(6) + ".jpg"
        im.save(os.path.join(OUT, name), "JPEG", quality=84, optimize=True, progressive=True)
        pid = f"{truth[0]}{secrets.token_hex(2)}"
        credit = "Canva AI" if truth == "ai" else "PHOTOGRAPHER · SOURCE"
        tell = "AI. WHAT GIVES IT AWAY." if truth == "ai" else "Real. WHY IT IS REAL."
        print(f'  {{ id: "{pid}", file: "{name}", truth: "{truth}", tell: "{tell}", credit: "{credit}" }},  // {os.path.basename(path)}')


if __name__ == "__main__":
    main()
