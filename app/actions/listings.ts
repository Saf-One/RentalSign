'use server'

import { prisma } from '../../lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createListing(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const address = formData.get('address') as string
  const pricePerNight = parseFloat(formData.get('pricePerNight') as string)
  
  // Find the first user as a fallback host
  const host = await prisma.user.findFirst()
  if (!host) {
    throw new Error('No user found to assign as host')
  }
  const hostId = host.id

  if (!title || !description || !address || isNaN(pricePerNight)) {
    throw new Error('All fields are required')
  }

  await prisma.listing.create({
    data: {
      title,
      description,
      address,
      pricePerNight,
      hostId,
    },
  })

  revalidatePath('/listings')
  redirect('/listings')
}
