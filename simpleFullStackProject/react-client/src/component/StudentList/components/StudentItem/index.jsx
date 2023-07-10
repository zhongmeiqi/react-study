import {useContext} from "react"
import ThemeContext from "../../../../context/themeContext"

export default function StudentItem(props){
// 现实里我如果要用互联网我就要接入互联网
// 在react里，我如果要使用上下文，我就要先接入上下文
const contextValue = useContext(ThemeContext);//接入上下文，接入了以后意味着这个上下文里的所有数据我都可以拿到

return (
    <div style={{background:contextValue==="light"?"#fff":"#666"}}>
        name:{props.name}
        age:{props.age}
    </div>
)
}