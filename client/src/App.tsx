import { MainView } from "./MainView";
import { Routes } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";


const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="*" element={<MainView />} />
            </Routes>

        </Router >
    )
}

export default App;