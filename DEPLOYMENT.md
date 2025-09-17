# Deployment Guide

## 🚀 Deployment Options

### 1. Vercel (Recommended for React/Vite apps)

#### Setup:

1. **Connect to Vercel:**

   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy from front-end directory:**

   ```bash
   cd front-end
   vercel
   ```

3. **Configure Environment Variables in Vercel Dashboard:**

   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

4. **Build Settings:**
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

#### Automatic Deployments:

- Connect your GitHub repository to Vercel
- Automatic deployments on every push to main branch

### 2. Netlify

#### Setup:

1. **Build the project:**

   ```bash
   cd front-end
   npm run build
   ```

2. **Deploy to Netlify:**

   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository

3. **Environment Variables:**

   - Add in Netlify dashboard under Site Settings > Environment Variables
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. **Build Settings:**
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`

### 3. GitHub Pages

#### Setup:

1. **Install gh-pages:**

   ```bash
   cd front-end
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json:**

   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run build
   npm run deploy
   ```

### 4. Railway

#### Setup:

1. **Connect GitHub repository to Railway**
2. **Set environment variables:**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. **Build settings:**
   - **Build Command:** `cd front-end && npm run build`
   - **Start Command:** `cd front-end && npm run preview`

## 🔧 Pre-Deployment Checklist

### ✅ Environment Variables

Create a `.env` file in the `front-end` directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### ✅ Database Setup

1. **Create Supabase project** (if not already done)
2. **Run the SQL schema** from `front-end/SUPABASE_SETUP.md`
3. **Set up storage bucket** for file uploads
4. **Configure RLS policies**

### ✅ Build Test

```bash
cd front-end
npm run build
```

### ✅ Production Build

The project builds successfully with:

- TypeScript compilation
- Vite bundling
- No linter errors
- All components working

## 🌐 Domain Configuration

### Custom Domain (Optional)

1. **Vercel:** Add custom domain in project settings
2. **Netlify:** Add custom domain in site settings
3. **Railway:** Configure custom domain in project settings

### SSL Certificate

- Automatically handled by all recommended platforms
- HTTPS enabled by default

## 📊 Monitoring & Analytics

### Vercel Analytics

- Built-in analytics dashboard
- Performance metrics
- User behavior tracking

### Supabase Dashboard

- Database monitoring
- Storage usage
- API usage statistics

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./front-end
```

## 🚨 Troubleshooting

### Common Issues:

1. **Environment variables not loading:**

   - Ensure variables start with `VITE_`
   - Restart development server after adding variables

2. **Build failures:**

   - Check TypeScript errors: `npm run build`
   - Verify all imports are correct

3. **Database connection issues:**

   - Verify Supabase URL and keys
   - Check RLS policies
   - Ensure tables exist

4. **File upload issues:**
   - Verify storage bucket is public
   - Check storage policies
   - Ensure file size limits are appropriate

## 📝 Post-Deployment

### Testing:

1. **Create a test profile** using the form
2. **Verify file uploads** work correctly
3. **Check all sections** display properly
4. **Test responsive design** on different devices

### Maintenance:

1. **Monitor Supabase usage** and costs
2. **Update dependencies** regularly
3. **Backup database** periodically
4. **Monitor performance** metrics

## 🎯 Production Optimizations

### Performance:

- Images are automatically optimized by Vite
- Code splitting is enabled
- Tree shaking removes unused code

### Security:

- Environment variables are properly secured
- RLS policies protect database
- HTTPS enforced

### Scalability:

- Supabase handles database scaling
- CDN distribution for static assets
- Automatic scaling on all platforms
