import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://egqtbugiofgxkiotnftm.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncXRidWdpb2ZneGtpb3RuZnRtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjY2Nzk0NCwiZXhwIjoyMDY4MjQzOTQ0fQ.C4mO5HU_5zrfXjbfT42cVPLQvkxlk5RMQBzGl28XUXw';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function makeUserAdmin(userId: string) {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { isAdmin: true },
  });

  if (error) {
    console.error("❌ Failed to update user:", error.message);
  } else {
    console.log("✅ User updated successfully:", data);
  }
}

makeUserAdmin('16a632e7-d8d6-4d59-8f85-d974a175f166');
