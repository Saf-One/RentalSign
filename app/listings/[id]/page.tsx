import { prisma } from '../../../lib/prisma'
import { notFound } from 'next/navigation'
import BookingForm from '../../../components/BookingForm'
import ReviewForm from '../../../components/ReviewForm'

interface ListingDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params

  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      host: true,
      photos: true,
      reviews: true,
    },
  })

  if (!listing) {
    notFound()
  }

  const dummyUserId = 'd5538e4a-8d05-47a3-a7c8-251786523179' // Example ID

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{listing.title}</h1>
      <p className="text-gray-600 text-lg mb-6">{listing.address}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-black">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{listing.description}</p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            {listing.reviews.map(review => (
              <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 text-black">
                <p className="font-bold">{review.rating}/5</p>
                <p>{review.comment}</p>
              </div>
            ))}
            <ReviewForm listingId={listing.id} userId={dummyUserId} />
          </div>
        </div>
        
        <div>
          <BookingForm listingId={listing.id} userId={dummyUserId} pricePerNight={Number(listing.pricePerNight)} />
        </div>
      </div>
    </div>
  )
}
