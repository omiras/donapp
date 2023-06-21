import { useState } from "react"

function StaticRating(props) {
    const hoverRateUnity = "https://i.ibb.co/k8SssB1/recortada-7e5fdbd8-e899-4761-a950-aab6a404dfe9.png"
    const rateUnity = "https://i.ibb.co/k3wcv4m/recortada-1843b106-1d81-4eba-b69a-c4d81226d241.png"
    const halfRateUnity = "https://i.ibb.co/2ynFLWw/recortada-bf9bab81-a2cf-4bd3-8b7f-652560e863ce.png"

    


    let numImages = props.rating
   
    

    if (props.itsEditable === false) {
        
        if (numImages === 5) {
            return <div style={{ display: 'flex', gap: "1em" }}>
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
            </div>
        } else if (numImages <= 4.5 && numImages > 4) {
            return <div style={{ display: 'flex', gap: "1em" }}>
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={halfRateUnity} alt="hands and heart" />
            </div>
        } else if (numImages <= 4 && numImages > 3.5) {
            return <div style={{ display: 'flex', gap: "1em" }}>
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
            </div>
        } else if (numImages <= 3.5 && numImages > 3) {
            return <div style={{ display: 'flex', gap: "1em" }}>
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={halfRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
            </div>

        }
        else if (numImages <= 3 && numImages > 2.5)  {
            return <div style={{ display: 'flex', gap: "1em" }}>
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
            </div>

        } else if (numImages <= 2.5 && numImages > 2) {
            return <div style={{ display: 'flex', gap: "1em" }}>
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={halfRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
            </div>
        } else if (numImages <= 2 && numImages > 1.5) {
            return <div style={{ display: 'flex', gap: "1em" }}>
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
            </div>
        } else if (numImages <= 1.5 && numImages > 1.0) {
            return <div style={{ display: 'flex', gap: "1em" }}>
                <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={halfRateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
            </div>
        } else if (numImages <= 1 && numImages > 0.5) {
            return <div style={{ display: 'flex', gap: "1em" }}>
            <img style={{ width: '2.5em' }} src={hoverRateUnity} alt="hands and heart" />
            <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
            <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
            <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
            <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
                        </div>
        } else if (numImages === 0) {
            return <div style={{ display: 'flex', gap: "1em" }}>
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
                <img style={{ width: '2.5em' }} src={rateUnity} alt="hands and heart" />
            </div>
        }
    } if (props.itsEditable === true) {

        const [rating, setRating] = useState(null)
        const [hover, setHover] = useState(null)

        return (
            <div className="flex gap-4">
                {[...Array(5)].map((heart, i)  => {
                    const ratingValue = i + 1;

                    return (
                        <label>
                            <input
                            type="radio"
                            name="rating"
                            className="hidden"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            />
                            <img 
                            src={ratingValue <= (hover || rating) ? hoverRateUnity : rateUnity}
                            style={{width: "2.5em", cursor:"pointer"}}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)} />
                        </label>
                    )
                })}
                

            </div>
        )
        
    }

        

        
}

export default StaticRating

// for (let i = 0; i < props.numImages; i++) {
//    images.push(<img src={hoverRateUnity} alt={'hands'} width={150} />)
//  }
//   return <div>{images}</div>;
// }

