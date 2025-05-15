import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nuioyvkictvpogtxcatk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51aW95dmtpY3R2cG9ndHhjYXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNDc2NDMsImV4cCI6MjA2MjcyMzY0M30.ZJrdvRtVB6nDQ8tQ9eaewr50z14lHy27U9r-2u41TBc';


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
