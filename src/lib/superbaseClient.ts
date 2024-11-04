// superbaseClient.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
console.log("Creating single Supabase instance");

const supabaseClient = createClientComponentClient();

export default supabaseClient;
