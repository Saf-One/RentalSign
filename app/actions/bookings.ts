'use server'

import { prisma } from '../../lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createBooking(formData: FormData) {
  const listingId = formData.get('listingId') as string
  const userId = formData.get('userId') as string // In real app, get from auth session
  const checkIn = new Date(formData.get('checkIn') as string)
  const checkOut = new Date(formData.get('checkOut') as string)
  const totalPrice = parseFloat(formData.get('totalPrice') as string)

  try {
    await prisma.booking.create({
      data: {
        listingId,
        userId,
        checkIn,
        checkOut,
        totalPrice,
      },
    })
    revalidatePath(`/listings/${listingId}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to create booking:', error)
    return { success: false, error: 'Failed to create booking' }
  }
}
