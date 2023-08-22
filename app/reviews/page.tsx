import { Fragment } from 'react'
import Link from 'next/link'
import { getReviews } from '@/lib/reviews'
import Heading from '@/components/Heading'

export default async function ReviewsPage() {
  const reviews = await getReviews()

  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3 mt-4">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="w-80 border rounded bg-white shadow transition-all hover:shadow-lg hover:-mt-[0.125rem] hover:mb-[0.125rem]"
          >
            <Link href={`/reviews/${review.slug}`}>
              <img src={review.image} alt={review.title} width={320} height={180} className="rounded-t" />
              <h2 className="py-2 font-orbitron font-medium text-lg text-center">{review.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
