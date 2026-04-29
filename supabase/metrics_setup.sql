-- Create metrics table
CREATE TABLE IF NOT EXISTS metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    description TEXT NOT NULL,
    chart_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON metrics
    FOR SELECT USING (true);

-- Allow authenticated users to perform all actions
CREATE POLICY "Allow authenticated full access" ON metrics
    FOR ALL USING (auth.role() = 'authenticated');

-- Clear existing data to prevent duplicates during seeding
DELETE FROM metrics;

-- Seed with initial data
INSERT INTO metrics (label, value, description, chart_data) VALUES
(
    'YoY Revenue Growth',
    '110%',
    'Driving commercial success through shipping scalable fintech architecture at Lemonade Payments.',
    '[{"name": "2023 Q1", "value": 400}, {"name": "2023 Q2", "value": 480}, {"name": "2023 Q3", "value": 520}, {"name": "2023 Q4", "value": 600}]'::jsonb
),
(
    'API Latency Reduction',
    '40%',
    'Optimized mission-critical backends for high-concurrency global markets.',
    '[{"name": "Baseline", "value": 100}, {"name": "Phase 1", "value": 85}, {"name": "Phase 2", "value": 70}, {"name": "Optimized", "value": 60}]'::jsonb
),
(
    'Infrastructure Cost Reduction',
    '32%',
    'Implemented new system design and tech stack at Workpay.',
    '[{"name": "Old Process", "value": 100}, {"name": "New System Deisgn", "value": 88}, {"name": "New Architecture", "value": 75}, {"name": "Current", "value": 68}]'::jsonb
),
(
    'Increase in Mobile Traffic',
    '25%',
    'Engineered performant React Native and Expo applications.',
    '[{"name": "Launch", "value": 2000}, {"name": "Month 3", "value": 2200}, {"name": "Month 6", "value": 2400}, {"name": "Month 12", "value": 2500}]'::jsonb
);
