export default function StudentItem(props){
console.log(props)

return (
    <div>
        name:{props.name}
        age:{props.age}
    </div>
)
}