import { BrowserRouter, Route, Routes } from "react-router-dom";
import Drive from "./drive"
import Login from "./login"
import Register from "./register"
import PrivateRoute from "./routes/PrivateRoutes";
import PublicRoute from "./routes/PublicRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="content">
          <Routes >
            <Route exact path='/' element={<PrivateRoute><Drive /></PrivateRoute>} />
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          </Routes >
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
