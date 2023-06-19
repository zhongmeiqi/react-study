import { useState } from "react"

export default function Ticker(){

    const [timeCount,setTimeCount] = useState(0)

    return (
        <>
            <button>start</button>
            <span>{timeCount}</span>
        </>
    )
}