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

DB_HOST="aws-0-us-east-1.pooler.supabase.com"
DB_PORT="6543"
DB_USER="postgres.$PROJECT_REF"
DB_NAME="postgres"

echo "Connecting to $DB_HOST as $DB_USER..."

PGPASSWORD="$SUPABASE_PASSWORD" /usr/local/bin/psql \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  -c "ALTER TABLE projects ADD COLUMN IF NOT EXISTS show_case_study BOOLEAN DEFAULT TRUE;"

if [ $? -eq 0 ]; then
  echo "Column 'show_case_study' successfully added to 'projects' table!"
else
  echo "Failed to add column using $DB_HOST on port 6543. Trying port 5432..."
  PGPASSWORD="$SUPABASE_PASSWORD" /usr/local/bin/psql \
    -h "$DB_HOST" \
    -p "5432" \
    -U "$DB_USER" \
    -d "$DB_NAME" \
    -c "ALTER TABLE projects ADD COLUMN IF NOT EXISTS show_case_study BOOLEAN DEFAULT TRUE;"
  
  if [ $? -eq 0 ]; then
    echo "Column 'show_case_study' successfully added using port 5432!"
  else
    echo "Failed to connect on port 5432 as well."
    exit 1
  fi
fi
