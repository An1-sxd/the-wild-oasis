import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sqyfnfdqixejekchzicd.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxeWZuZmRxaXhlamVrY2h6aWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNDU0MDEsImV4cCI6MjA3NDgyMTQwMX0.upLzpvW20_DfDtlCnxTeT2-BO5w4QN3l84ol6F_t_G0"; // 👈 replace with your anon public key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
