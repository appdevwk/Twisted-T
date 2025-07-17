#!/bin/bash

# One-click script to push Twisted-Tshirt-co to GitHub
cd ~/twisted-tshirt-co/frontend

# Check if git is initialized, if not initialize it
if [ ! -d ".git" ]; then
    git init
fi

# Add remote (ignore error if already exists)
git remote add origin https://github.com/appdevwk/Twisted-T.git 2>/dev/null || true

# Stage all files
git add .

# Commit with timestamp
git commit -m "Update Twisted-Tshirt-co $(date)"

# Push to GitHub
echo "Pushing to GitHub..."
echo "When prompted:"
echo "Username: appdevwk"
echo "Password: Use your Personal Access Token (the one you showed earlier)"

git push origin main
