import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zmieylfkhqzzkkzkadal.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptaWV5bGZraHF6emtremthZGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNTA0NTMsImV4cCI6MjA2NzYyNjQ1M30.NDl5EOf3v97kM-D0_17aORqygO-ew9C-77rNhW8YqWY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
