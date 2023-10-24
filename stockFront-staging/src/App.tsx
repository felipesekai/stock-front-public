import './input.css'
import {Routes} from './routes/Routes'
import {useAuth} from "./context/Auth"
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.css'; // core css
import 'primeicons/primeicons.css'; // icons
// import 'primeflex/primeflex.css';
import './css/custom.css'
import {Loading} from "./components/Loading/Loading";

function App() {
    const {loading} = useAuth()
    return (
        <div className="w-full max-w-[1260px] ">
            <Loading open={loading}/>
            <Routes/>
        </div>
    )
}

export default App
