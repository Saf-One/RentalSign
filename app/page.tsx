import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-gray-50 font-sans">
      <main className="w-full max-w-5xl py-16 px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">RentalSign</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The easiest way to find, book, and manage your rental properties. Secure, fast, and simple.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/listings"
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition"
            >
              Browse Listings
            </Link>
            <Link
              href="/listings/create"
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full border border-blue-600 hover:bg-blue-50 transition"
            >
              Post a Property
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
