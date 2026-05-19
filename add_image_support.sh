#!/bin/bash

# Read env variables from .env.local
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

# Extract project ref from NEXT_PUBLIC_SUPABASE_URL
PROJECT_REF=$(echo "$NEXT_PUBLIC_SUPABASE_URL" | sed -E 's|https://([^.]+)\.supabase\..*|\1|')

if [ -z "$PROJECT_REF" ] || [ -z "$SUPABASE_PASSWORD" ]; then
  echo "Failed to extract PROJECT_REF or SUPABASE_PASSWORD from .env.local"
  exit 1
fi

DB_HOST="aws-1-ap-south-1.pooler.supabase.com"
DB_PORT="6543"
DB_USER="postgres.$PROJECT_REF"
DB_NAME="postgres"

SQL_COMMANDS=$(cat <<EOF
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_url TEXT;

INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING ( bucket_id = 'project-images' );

DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'project-images' );

DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE TO authenticated USING ( bucket_id = 'project-images' );

DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE TO authenticated USING ( bucket_id = 'project-images' );
EOF
)

echo "Connecting to $DB_HOST as $DB_USER..."

PGPASSWORD="$SUPABASE_PASSWORD" /usr/local/bin/psql \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  -c "$SQL_COMMANDS"

if [ $? -eq 0 ]; then
  echo "Database and storage setup successfully applied!"
else
  echo "Failed to apply database setup using port 6543. Trying port 5432..."
  PGPASSWORD="$SUPABASE_PASSWORD" /usr/local/bin/psql \
    -h "$DB_HOST" \
    -p "5432" \
    -U "$DB_USER" \
    -d "$DB_NAME" \
    -c "$SQL_COMMANDS"
  
  if [ $? -eq 0 ]; then
    echo "Database and storage setup successfully applied using port 5432!"
  else
    echo "Failed to connect on port 5432 as well."
    exit 1
  fi
fi
