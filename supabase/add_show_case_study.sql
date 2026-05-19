-- Add show_case_study column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS show_case_study BOOLEAN DEFAULT FALSE;
