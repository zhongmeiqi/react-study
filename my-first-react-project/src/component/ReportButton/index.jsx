export default function ReportButton(){
    const handleCLick=()=>{
        console.log("hello world")
    }
    return (
        <button onClick={handleCLick}>click me</button>
    )
}