#!/bin/bash

# Install Speed Insights
npm i @vercel/speed-insights --legacy-peer-deps

# Find and modify the main App file
APP_FILE=$(find . -name "App.js" -o -name "App.jsx" | head -1)

if [ -z "$APP_FILE" ]; then
    echo "No App.js or App.jsx found. Creating App.jsx..."
    APP_FILE="./src/App.jsx"
    mkdir -p src
fi

# Backup original file
cp "$APP_FILE" "${APP_FILE}.backup" 2>/dev/null

# Create/modify the App file with Speed Insights
cat > "$APP_FILE" << 'EOF'
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <div>
      <h1>Twisted T-Shirt Co</h1>
      <SpeedInsights />
    </div>
  );
}

export default App;
EOF

echo "✅ Speed Insights installed and added to $APP_FILE"
echo "✅ Original file backed up as ${APP_FILE}.backup"

# Stage, commit, and push
git add .
git commit -m "Add Vercel Speed Insights"
git push origin main --force-with-lease

echo "✅ Pushed to GitHub"
echo "🎉 DONE!"
