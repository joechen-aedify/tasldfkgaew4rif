#!/bin/bash

# Sync configuration from parent to template_1/public
# This ensures the template always uses the latest config

echo "🔄 Syncing template_1_config.json..."

SOURCE="../template_1_config.json"
DEST="./public/template_1_config.json"

if [ -f "$SOURCE" ]; then
    cp "$SOURCE" "$DEST"
    echo "✅ Config synced successfully!"
    echo "📄 Copied from: $SOURCE"
    echo "📂 Copied to: $DEST"
else
    echo "❌ Error: Source config file not found at $SOURCE"
    exit 1
fi

