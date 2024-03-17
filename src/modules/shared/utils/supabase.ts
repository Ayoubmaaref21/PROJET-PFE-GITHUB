//@ts-ignore
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ybmazjttalpakqqztmdt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibWF6anR0YWxwYWtxcXp0bWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1MDI1NjIsImV4cCI6MjAyNjA3ODU2Mn0.PAUyacMwf-v_-GmLZ8iNFSDWma9Yczd2dOj1ktslVCI'
)
export { supabase }
