import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://klaveowqwvtxrwrrhqmu.supabase.co'
const supabaseKey = 'sb_publishable_4YORwQqq13PXg1qzSl4Irw_aEXYUSDC'

export const supabase = createClient(supabaseUrl, supabaseKey)