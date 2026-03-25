#!/bin/bash

echo "🚀 ChaosPrep Quick Start Setup"
echo "=============================="
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found"
    echo "Creating .env.local from template..."
    cp .env.example .env.local
    echo ""
    echo "✅ Created .env.local"
    echo ""
    echo "📝 Please edit .env.local with your credentials:"
    echo "   1. Get Supabase URL & ANON_KEY from supabase.com"
    echo "   2. Get Gemini API key from makersuite.google.com"
    echo ""
    read -p "Press Enter when done editing .env.local..."
else
    echo "✅ .env.local exists"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check if Supabase SDK is available
if npm list @supabase/supabase-js > /dev/null 2>&1; then
    echo "✅ Supabase SDK installed"
else
    echo "❌ Supabase SDK not found"
    exit 1
fi

# Build check
echo ""
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Setup complete! Run 'npm run dev' to start"
else
    echo "❌ Build failed. Check errors above."
    exit 1
fi
