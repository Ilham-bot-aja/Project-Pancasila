import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://klaveowqwvtxrwrrhqmu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsYXZlb3dxd3Z0eHJ3cnJocW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzY4MDcsImV4cCI6MjA5ODE1MjgwN30.lkPmCxyKLtbdxrmfuwiRkOkP6lkRhfteYmXq7Nkn1GY'

export const supabase = createClient(supabaseUrl, supabaseKey)