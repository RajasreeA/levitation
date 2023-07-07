import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import MultiStepFormPage from './pages/Form';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/form"element={<MultiStepFormPage/>} />
        <Route path="/" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;