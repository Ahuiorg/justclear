import { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { AppointmentInsert } from '../types/database'

interface UseAppointmentReturn {
  submitAppointment: (data: AppointmentInsert) => Promise<void>
  submitting: boolean
  error: Error | null
  success: boolean
  reset: () => void
}

export function useAppointment(): UseAppointmentReturn {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [success, setSuccess] = useState(false)

  async function submitAppointment(data: AppointmentInsert) {
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const { error: insertError } = await supabase
        .from('appointments')
        .insert([data])

      if (insertError) throw insertError
      setSuccess(true)
    } catch (e) {
      setError(e as Error)
    } finally {
      setSubmitting(false)
    }
  }

  function reset() {
    setError(null)
    setSuccess(false)
  }

  return { submitAppointment, submitting, error, success, reset }
}

