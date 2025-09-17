#!/bin/bash

# LitSchoolDash Deployment Script
echo "🚀 LitSchoolDash Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -d "front-end" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Navigate to front-end directory
cd front-end

echo "📦 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🌐 Deployment Options:"
    echo "1. Vercel (Recommended):"
    echo "   - Install Vercel CLI: npm install -g vercel"
    echo "   - Run: vercel"
    echo "   - Set environment variables in Vercel dashboard"
    echo ""
    echo "2. Netlify:"
    echo "   - Drag and drop the 'dist' folder to Netlify"
    echo "   - Set environment variables in Netlify dashboard"
    echo ""
    echo "3. GitHub Pages:"
    echo "   - Run: npm run deploy"
    echo ""
    echo "📋 Required Environment Variables:"
    echo "   - VITE_SUPABASE_URL=your_supabase_project_url"
    echo "   - VITE_SUPABASE_ANON_KEY=your_supabase_anon_key"
    echo ""
    echo "📚 For detailed instructions, see DEPLOYMENT.md"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
