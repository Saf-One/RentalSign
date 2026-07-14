import { createBooking } from '../app/actions/bookings'

export default function BookingForm({ listingId, userId, pricePerNight }: { listingId: string, userId: string, pricePerNight: number }) {
  return (
    <form action={async (formData) => {
        await createBooking(formData)
      }} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold mb-4">Book this property</h3>
      <input type="hidden" name="listingId" value={listingId} />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="totalPrice" value={pricePerNight * 2} /> {/* Simplified calculation */}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Check-in</label>
        <input type="date" name="checkIn" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black" required />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Check-out</label>
        <input type="date" name="checkOut" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black" required />
      </div>
      
      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
        Book Now
      </button>
    </form>
  )
}
