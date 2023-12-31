'use client'

import React, { useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { PATH } from '@/components/NavBar'
import { useDebounce } from 'use-debounce'

interface SearchBoxProps {
  id: number
  slug: string
  title: string
}

export default function SearchBox() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [debouncedValue] = useDebounce(query, 300)
  const [reviews, setReviews] = useState<SearchBoxProps[]>([])

  useEffect(() => {
    if (debouncedValue.trim().length > 0) {
      const cotroller = new AbortController()
      ;(async function getReviews() {
        try {
          const url = '/api/search?query=' + encodeURIComponent(debouncedValue.trim())
          const response = await fetch(url, { signal: cotroller.signal })
          const _reviews = await response.json()

          setReviews(_reviews)
        } catch (error) {
          console.log(error)
        }
      })()
      return () => cotroller.abort()
    } else {
      setReviews([])
    }
  }, [debouncedValue])

  function handleOnChange({ slug }: { id: number; slug: string; title: string }) {
    router.push(`${PATH.reviews}/${slug}`)
  }

  return (
    <div className="relative">
      <Combobox onChange={handleOnChange}>
        <Combobox.Input
          placeholder="Search…"
          className="border rounded outline-none px-2 py-1"
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
          autoComplete="off"
        />
        <Combobox.Options className="left-0 right-0 top-full absolute rounded bg-white shadow-md">
          {reviews.map((review, index) => (
            <Combobox.Option key={review.id} value={review}>
              {({ active }) => (
                <span
                  className={classNames('px-2 py-1 line-clamp-1 cursor-pointer transition-all', {
                    'bg-orange-100': active,
                    'rounded-bl rounded-br': index === reviews.length - 1,
                    'rounded-tl rounded-tr': index === 0,
                  })}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  )
}
