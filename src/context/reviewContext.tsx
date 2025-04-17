"use client"

import { ReviewContextType, Review } from "@/model/review"
import React from "react"

export const ReviewContext = React.createContext<ReviewContextType | null>(
    null
)

export const ReviewProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [review, setReview] = React.useState<Review>()
    const [reviews, setReviews] = React.useState<Review[]>([])

    const storeReview = (review: Review) => {
        setReview(review)
    }
    const storeReviews = (reviews: Review[]) => {
        setReviews(reviews)
    }

    const value = {
        review,
        reviews,
        storeReview,
        storeReviews,
    }

    return (
        <ReviewContext.Provider value={value}>
            {children}
        </ReviewContext.Provider>
    )
}
