-- Create reading_history table
CREATE TABLE IF NOT EXISTS reading_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  article_title text NOT NULL,
  article_category text NOT NULL,
  article_url text NOT NULL,
  read_at timestamptz DEFAULT now(),
  time_spent int4 DEFAULT 0,
  UNIQUE(user_id, article_url)
);

-- Create recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  article_title text NOT NULL,
  article_category text NOT NULL,
  article_url text NOT NULL,
  score numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, article_url)
);

-- Create users table if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users') THEN
    CREATE TABLE users (
      id uuid PRIMARY KEY REFERENCES auth.users(id),
      email text UNIQUE NOT NULL,
      name text,
      preferences jsonb DEFAULT '{}'::jsonb,
      created_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies with IF NOT EXISTS checks
DO $$ 
BEGIN
  -- Reading history policies
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'reading_history' 
    AND policyname = 'Users can read own reading history'
  ) THEN
    CREATE POLICY "Users can read own reading history"
      ON reading_history FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'reading_history' 
    AND policyname = 'Users can insert own reading history'
  ) THEN
    CREATE POLICY "Users can insert own reading history"
      ON reading_history FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Recommendations policies
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'recommendations' 
    AND policyname = 'Users can read own recommendations'
  ) THEN
    CREATE POLICY "Users can read own recommendations"
      ON recommendations FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  -- Users policies
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'users' 
    AND policyname = 'Users can read own data'
  ) THEN
    CREATE POLICY "Users can read own data"
      ON users FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'users' 
    AND policyname = 'Users can update own data'
  ) THEN
    CREATE POLICY "Users can update own data"
      ON users FOR UPDATE
      TO authenticated
      USING (auth.uid() = id);
  END IF;
END $$;

-- Create or replace function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();