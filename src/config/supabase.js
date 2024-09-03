const { createClient } = require('@supabase/supabase-js');

const options = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' },
  },
};
// Use a custom domain as the supabase URL
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

module.exports = supabase;
