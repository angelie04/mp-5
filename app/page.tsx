"use client";
import NewShortUrlForm from "@/components/UrlForm"

export default function Home() {
  return (
      <div className="flex flex-col items-center min-h-screen p-6 bg-pink-100">

        {/* Title */}
        <h1 className="text-3xl font-bold text-pink-600 mb-4">
          URL Shortener
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6 text-center">
          Make your links short & easy to share
        </p>

        <NewShortUrlForm />

      </div>
  );
}