import { prisma } from '../../lib/prisma'
import Link from 'next/link'

interface ListingsPageProps {
  searchParams: Promise<{ search?: string }>
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams
  const search = params.search || ''

  const listings = await prisma.listing.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ],
    },
    include: {
      host: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Listings</h1>
        <Link
          href="/listings/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Listing
        </Link>
      </div>

      {/* Search Form */}
      <form method="GET" action="/listings" className="mb-8 flex gap-2">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search listings by title, description, or address..."
          className="flex-1 border border-gray-300 rounded px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
        >
          Search
        </button>
      </form>

      {/* Listings Grid */}
      {listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No listings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white text-black"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {listing.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>📍 {listing.address}</span>
                  <span>Hosted by {listing.host.name || 'Anonymous'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
                    ${listing.pricePerNight.toString()} / night
                  </span>
                  <Link
                    href={`/listings/${listing.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
