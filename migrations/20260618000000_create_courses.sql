-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  icon_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed data with mock courses
INSERT INTO courses (title, progress, icon_name) VALUES
('Introduction to Next.js App Router', 75, 'Code'),
('Advanced React Patterns', 30, 'Layers'),
('Framer Motion Animation', 10, 'PlayCircle'),
('Supabase Backend Integration', 0, 'Database');
