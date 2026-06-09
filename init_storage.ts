import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function initStorage() {
  const { data, error } = await supabase.storage.createBucket('mythos', {
    public: true,
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    fileSizeLimit: 5242880 // 5MB
  })

  if (error) {
    console.error('Error creating bucket:', error.message)
  } else {
    console.log('Bucket "mythos" created successfully!')
  }
}

initStorage()
