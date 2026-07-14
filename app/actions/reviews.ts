'use server'

import { prisma } from '../../lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createReview(formData: FormData) {
  const listingId = formData.get('listingId') as string
  const userId = formData.get('userId') as string // In real app, get from auth session
  const rating = parseInt(formData.get('rating') as string)
  const comment = formData.get('comment') as string

  try {
    await prisma.review.create({
      data: {
        listingId,
        userId,
        rating,
        comment,
      },
    })
    revalidatePath(`/listings/${listingId}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to create review:', error)
    return { success: false, error: 'Failed to create review' }
  }
}
