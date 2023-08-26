/* eslint-disable no-unused-vars */
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import "./Payment.css";
import axios from 'axios';
import { useGlobalContext } from '../../StateContext';

const   Payment = ()=> {
    const {user,setuser} = useGlobalContext();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()

    const handlePayment = async () => {
        if (!stripe || !elements) {
            return;
        }
    
        const { token, error } = await stripe.createToken(elements.getElement(CardElement));
    
        if (error) {
            console.error(error);
        } else {
            try {
                // Create a payload with the user's updated plan data and email
                const updatedPlanData = {
                    email: user.email, // Include the user's email for identification
                    plan: {
                        cycle: user.plan.cycle, // Assuming cycle doesn't change during payment
                        name: user.plan.name,   // Assuming plan name doesn't change during payment
                        price: user.plan.price, // Assuming price doesn't change during payment
                        devices: user.plan.devices, // Assuming devices don't change during payment
                        state: 'active',
                        dateofsubscription: new Date(),
                    }
                };
    
                // Make the axios PUT request to update the user's plan
                const { data } = await axios.put("http://localhost:3000/UpdateUser", updatedPlanData);
    
                // After successful update, navigate to the selected_plan route
               
                navigate('/CurrentPlan');
            } catch (e) {
                console.log(e);
            }
        }
    };
    
    
    return (
        <div className='Payment_Screen_wrapper'>
            <div className="Payment_Screen_Container">
                <div className="CardInfo">
                    <h2>Complete Payment</h2>
                    <span>Enter your credit or debit card details below</span>
                    <div style={{ "width": "90%" }}>
                        <CardElement options={{
                            hidePostalCode: true,
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }} />
                    </div>
                    <input
                        type="submit"
                        value="Confirm Payment"
                        id="signUpButton"
                        onClick={handlePayment}
                    />
                </div>
                <div className="OrderInfo">
                    <h2>Order Summary</h2>
                    <div className="Order_decription">
                        <span>Plan Name</span>
                        <span>{user?.plan?.name}</span>
                    </div>
                    <div className="Order_decription">
                        <span>Billing Cycle</span>
                        <span>{user?.plan?.cycle}</span>
                    </div>
                    <div className="Order_decription">
                        <span>Plan price</span>
                        <span>{user?.plan?.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Payment;