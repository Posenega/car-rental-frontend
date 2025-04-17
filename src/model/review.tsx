export interface Review {
    _id?: string; // optional if not yet saved to the database
    name: string;
    date: string;
    image: string; // image path or URL
    text: string;
    rating: number; // from 1 to 5
}

export type ReviewContextType = {
    review: Review | undefined
    reviews: Review[]
    storeReview: (user: Review) => void
    storeReviews: (reviews: Review[]) => void
}