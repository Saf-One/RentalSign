import { createReview } from '../app/actions/reviews'

export default function ReviewForm({ listingId, userId }: { listingId: string, userId: string }) {
  return (
    <form action={async (formData: FormData) => { await createReview(formData); }} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
      <h3 className="text-xl font-semibold mb-4">Leave a review</h3>
      <input type="hidden" name="listingId" value={listingId} />
      <input type="hidden" name="userId" value={userId} />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
        <input type="number" name="rating" min="1" max="5" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black" required />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Comment</label>
        <textarea name="comment" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black" required />
      </div>
      
      <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
        Submit Review
      </button>
    </form>
  )
}
