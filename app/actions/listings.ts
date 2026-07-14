'use server'

import { prisma } from '../../lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createListing(prevState: any, formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const address = formData.get('address') as string
  const pricePerNight = parseFloat(formData.get('pricePerNight') as string)
  
  // Find the first user as a fallback host
  const host = await prisma.user.findFirst()
  if (!host) {
    return { success: false, error: 'No user found' }
  }
  const hostId = host.id

  if (!title || !description || !address || isNaN(pricePerNight)) {
    return { success: false, error: 'All fields are required' }
  }

  try {
    await prisma.listing.create({
      data: {
        title,
        description,
        address,
        pricePerNight,
        hostId,
      },
    })
  } catch (e) {
    return { success: false, error: 'Failed to create listing' }
  }

  revalidatePath('/listings')
  redirect('/listings')
}
