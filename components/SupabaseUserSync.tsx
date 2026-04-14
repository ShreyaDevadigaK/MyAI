'use client'

import { useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'

export default function SupabaseUserSync() {
  const { user, isLoaded } = useUser()
  const hasSyncedRef = useRef(false)

  useEffect(() => {
    if (!isLoaded || !user || hasSyncedRef.current) {
      return
    }

    hasSyncedRef.current = true

    const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || ''
    const payload = {
      email,
      name: user.fullName || user.firstName || '',
    }

    fetch('/api/user-sync', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch((error) => {
      console.error('Failed to sync user to Supabase:', error)
    })
  }, [isLoaded, user])

  return null
}
