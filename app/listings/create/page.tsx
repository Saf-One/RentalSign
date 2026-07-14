'use client'

import { createListing } from '../../actions/listings'
import { useActionState } from 'react'

export default function CreateListingPage() {
  const [state, action, isPending] = useActionState(createListing, { success: false, error: '' })
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Listing</h1>
      <form
        action={action}
        className="max-w-lg bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-black"
      >
        {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="pricePerNight" className="block text-sm font-medium mb-1">
            Price per Night
          </label>
          <input
            type="number"
            id="pricePerNight"
            name="pricePerNight"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
        >
          {isPending ? 'Creating...' : 'Create Listing'}
        </button>
      </form>
    </div>
  )
}
