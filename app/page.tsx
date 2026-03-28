'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Page() {
  useEffect(() => {
    const run = async () => {
      const { data, error } = await supabase
        .from('ticket')
        .insert({
          title: 'Test Ticket',
          description: 'Mein erstes Ticket',
          status: 'open',
        })
        .select()

      console.log('inserted row:', data)
      console.log('error:', error)
    }

    run()
  }, [])

  return <div>Check console</div>
}
