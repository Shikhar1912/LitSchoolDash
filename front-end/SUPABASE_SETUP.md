# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Note down your project URL and anon key

## 2. Environment Variables

Create a `.env` file in the front-end directory with:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Create Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Click **"New Bucket"**
3. Configure:
   - **Name**: `profile-assets`
   - **Public**: ✅ **Check this** (for public image access)
   - **File size limit**: 50MB
   - **Allowed MIME types**: `image/*`

## 4. Database Schema

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  college TEXT,
  headline TEXT,
  bio TEXT,
  cover_image_url TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experiences table
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  logo_url TEXT,
  summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  value INTEGER NOT NULL CHECK (value >= 0 AND value <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social_links table
CREATE TABLE social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create endorsements table
CREATE TABLE endorsements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT,
  avatar_url TEXT,
  text TEXT NOT NULL,
  keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create epics table
CREATE TABLE epics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  date_range TEXT NOT NULL,
  theme TEXT NOT NULL,
  teams INTEGER DEFAULT 0,
  rounds INTEGER DEFAULT 0,
  judges INTEGER DEFAULT 0,
  badge TEXT,
  color TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create competitions table
CREATE TABLE competitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  date_range TEXT NOT NULL,
  category TEXT NOT NULL,
  participants INTEGER DEFAULT 0,
  rounds INTEGER DEFAULT 0,
  judges INTEGER DEFAULT 0,
  prize TEXT,
  position TEXT,
  color TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create highlights table
CREATE TABLE highlights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  date TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create interests table
CREATE TABLE interests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;
ALTER TABLE epics ENABLE ROW LEVEL SECURITY;
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access" ON profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON social_links FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON endorsements FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON epics FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON competitions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON highlights FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON interests FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON experiences FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON social_links FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON endorsements FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON epics FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON competitions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON highlights FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON interests FOR INSERT WITH CHECK (true);
```

## 5. Storage Policies

Run these SQL commands to set up storage access:

```sql
-- Allow public read access to storage
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'profile-assets');

-- Allow public uploads (for development - change to authenticated in production)
CREATE POLICY "Public upload access" ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'profile-assets');

-- Allow public updates (for development - change to authenticated in production)
CREATE POLICY "Public update access" ON storage.objects FOR UPDATE
USING (bucket_id = 'profile-assets');

-- Allow public deletes (for development - change to authenticated in production)
CREATE POLICY "Public delete access" ON storage.objects FOR DELETE
USING (bucket_id = 'profile-assets');
```

**Note**: These policies allow public access for development. In production, you should use authenticated policies for security.

## 6. Install Dependencies

```bash
cd front-end
npm install
```

## 7. Run the Application

```bash
npm run dev
```

## 8. Usage

- Visit `/` to see the profile page (currently using mock data)
- Visit `/add-profile` to add a new student profile
- The form will save data to Supabase and create a complete student profile

## 9. File Upload Features

The form now supports direct file uploads for:

- **Profile Avatar**: Upload profile pictures
- **Cover Image**: Upload cover photos
- **Company Logos**: Upload logos for experiences
- **Endorser Avatars**: Upload avatars for endorsements

### File Upload Benefits:

- **No URL needed**: Direct file upload to Supabase Storage
- **Automatic optimization**: Images are stored efficiently
- **Public URLs**: Generated automatically for display
- **Preview**: See uploaded images immediately
- **Progress indicators**: Upload status feedback

## Next Steps

To complete the integration, you'll need to:

1. Update the API layer to fetch from Supabase instead of mock data
2. Add authentication if needed
3. Add profile editing functionality
4. Add profile listing/deletion functionality
