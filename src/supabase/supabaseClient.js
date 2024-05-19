import config from "./config";
import { createClient } from "@supabase/supabase-js";
const supabaseURL = config.supabaseURL
const supabaseKey = config.supabaseKey
const supabase = createClient(supabaseURL, supabaseKey)
export {supabase};