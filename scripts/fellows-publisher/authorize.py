#!/usr/bin/env python3
"""
One-time OAuth for the YouTube publisher.

Opens a browser window. IMPORTANT: when Google shows the account chooser,
pick the "humanitarians ai" CHANNEL (brand account), not your personal
channel — the token determines which channel receives the uploads.

Produces token_youtube.json next to this script.
"""

from pathlib import Path
from google_auth_oauthlib.flow import InstalledAppFlow

BASE = Path(__file__).resolve().parent

SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube",
]

secret = BASE / "client_secret.json"
if not secret.exists():
    raise SystemExit(
        "Missing client_secret.json — download the OAuth desktop client from "
        "Google Cloud console and save it next to this script."
    )

flow = InstalledAppFlow.from_client_secrets_file(str(secret), SCOPES)
creds = flow.run_local_server(port=0)
(BASE / "token_youtube.json").write_text(creds.to_json())
print("Saved token_youtube.json — the publisher will upload as the channel "
      "you just selected.")
