import { useState } from "react"

function Rating() {

    const hoverRateUnity = "https://i.ibb.co/dpryb84/245135749-d01c1e48-8553-4bad-8c01-345088cecc69-1-removebg-preview.png"
    const rateUnity = "https://i.ibb.co/zncvvbs/63a4542c-a3ac-42e0-a51d-049f68794278-removebg-preview.png"

    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    return <div>
        {[...Array(5)].map((heart, i) => {
            const ratingValue = i 
            return <label>
                <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} />
                <span className="heart" onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)}><img width={'200px'} src={ratingValue <= (rating || hover) ? hoverRateUnity : rateUnity} /></span>
            </label>
        })}

    </div>
}

export default Rating