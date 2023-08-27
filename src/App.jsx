import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './components/payment/Payment';
import Select_plan from './components/selectPlan/Select_plan';
import Login from './components/login/Login';
import SignUp from './components/signUp/SignUp';
import Curent_plan from './components/currentPlan/Curent_plan';
import { AppProvider } from './StateContext';

const stripePromise = loadStripe('pk_test_51Nj5vhSDdCrLIyYK9CspzAmJSH4kEserW78exciQD0Rcs60sph2WZJFzqTFR2RNNjCyXDtF4hEViHC7HXQqNnCVU00KBiuV6cH'); // Replace with your Stripe publishable key

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/SignUp" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Plan" element={<Select_plan />} />
          <Route path="/Payment" element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          } />
          <Route path="/CurrentPlan" element={<Curent_plan />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
