import StudentList from "./component/StudentList"
import ForceUpdate from "./component/ForceUpdateTest"
import Counter from "./component/Counter"
import Ticker from "./component/Ticker"

function App(){
    return (
        <div>
            <StudentList />
            <ForceUpdate />
            <Counter/>
            <Ticker/>
        </div>
    )
}

export default App