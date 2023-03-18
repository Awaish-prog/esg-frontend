import { Route, Routes} from "react-router-dom";
import CreateEsgreport from "./Routes/CreateEsgReport";
import Dashboard from "./Routes/Dashboard";
import Login from "./Routes/Login";
import ReportDetails from "./Routes/ReportDetails";
import SignUp from "./Routes/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element = { <Login /> } />
      <Route path="/signup" element = { <SignUp /> } />
      <Route path="/dashboard" element = {<Dashboard />} />
      <Route path="/createEsgReport" element = {<CreateEsgreport />} />
      <Route path="/viewReport" element = {<ReportDetails />} />
    </Routes>
  );
}

export default App;
