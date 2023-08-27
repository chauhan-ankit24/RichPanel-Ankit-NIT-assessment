/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './Select_plan.css'
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../StateContext';

 const Select_plan = () => {
    const {user,setuser} = useGlobalContext();
    const navigate = useNavigate();

    const [showMonthly, setShowMonthly] = useState(true);
    const [selectedColumnIndex, setSelectedColumnIndex] = useState(0);

    const devices = [
        ['Phone', 'Tablet'], 
        ['Phone', 'Tablet', 'Computer', 'TV'], 
        ['Phone', 'Tablet', 'Computer', 'TV'], 
        ['Phone', 'Tablet', 'Computer', 'TV'], 
      ];

    const plansMonthly = [
        { price: '₹100' },
        { price: '₹200' },
        { price: '₹500' },
        { price: '₹700' },
    ];

    const plansYearly = [
        { price: '₹1000' },
        { price: '₹2000' },
        { price: '₹5000' },
        { price: '₹7000' },
    ];
    const planNames = ['Mobile', 'Basic', 'Standard', 'Premium'];

    const handleToggle = () => {
        setShowMonthly(!showMonthly);
    };
    console.log(user);


    const handleHeaderClick = (index) => {
        setSelectedColumnIndex(index);
      
        const selectedPlan = !showMonthly ? plansMonthly[index] : plansYearly[index];
        const selectedDevice = devices[index]; 
      
      
        const updatedUser = {
          ...user,
          plan: {
            ...user?.plan,
            cycle: !showMonthly ? 'monthly' : 'yearly', 
            name: planNames[index], 
            price: selectedPlan.price,
            state: 'active', 
            devices: selectedDevice, 
            dateofsubscription: new Date().toISOString().split('T')[0], 
          },
        };
        setuser(updatedUser);
      };
      
      
      

    const plansToShow = showMonthly ? plansYearly : plansMonthly;

    return (
        <div className="mainContainer">
            <div className="select_container">
                <div className="select_heading">
                    Choose the right plan for you
                </div>
                <div className="select_middle">
                    <div className="select_middle_head">
                        <div className="select_middle_row_button">
                            <div className="toggle-container">
                                <button
                                    className={`toggle-button ${showMonthly ? 'active' : ''}`}
                                    onClick={handleToggle}
                                >
                                    Monthly
                                </button>
                                <button
                                    className={`toggle-button ${!showMonthly ? 'active' : ''}`}
                                    onClick={handleToggle}
                                >
                                    Yearly
                                </button>
                            </div>
                        </div>

                        <div className="select_middle_row_right">
                            <div
                                className={`head_item ${selectedColumnIndex === 0 ? 'selected' : ''} `}
                                onClick={() => handleHeaderClick(0)}
                            >
                                Mobile
                                <div className={`${selectedColumnIndex === 0 ? 'triangle' : ''} `}></div>
                            </div>
                            <div
                                className={`head_item ${selectedColumnIndex === 1 ? 'selected' : ''}`}
                                onClick={() => handleHeaderClick(1)}
                            >
                                Basic
                                <div className={`${selectedColumnIndex === 1 ? 'triangle' : ''} `}></div>
                            </div>
                            <div
                                className={`head_item ${selectedColumnIndex === 2 ? 'selected' : ''}`}
                                onClick={() => handleHeaderClick(2)}
                            >Standard
                                <div className={`${selectedColumnIndex === 2 ? 'triangle' : ''} `}></div></div>

                            <div
                                className={`head_item ${selectedColumnIndex === 3 ? 'selected' : ''}`}
                                onClick={() => handleHeaderClick(3)}
                            >Premium
                                <div className={`${selectedColumnIndex === 3 ? 'triangle' : ''} `}></div></div>
                        </div>
                    </div>
                    <div className="select_middle_row">
                        <div className="select_middle_row_left">
                            Monthly Price
                        </div>
                        <div className="select_middle_row_right">
                            <div className={`middle_item ${selectedColumnIndex === 0 ? ' selected' : ''}`}>{plansToShow[0].price}</div>
                            <div className={`middle_item ${selectedColumnIndex === 1 ? ' selected' : ''}`}>{plansToShow[1].price}</div>
                            <div className={`middle_item ${selectedColumnIndex === 2 ? ' selected' : ''}`}>{plansToShow[2].price}</div>
                            <div className={`middle_item ${selectedColumnIndex === 3 ? ' selected' : ''}`}>{plansToShow[3].price}</div>
                        </div>
                    </div>
                    <div className="select_middle_row">
                        <div className="select_middle_row_left">
                            Video Quality
                        </div>
                        <div className="select_middle_row_right">
                            <div className={`middle_item ${selectedColumnIndex === 0 ? ' selected' : ''}`}>Good</div>
                            <div className={`middle_item ${selectedColumnIndex === 1 ? ' selected' : ''}`}>Good</div>
                            <div className={`middle_item ${selectedColumnIndex === 2 ? ' selected' : ''}`}>Better</div>
                            <div className={`middle_item ${selectedColumnIndex === 3 ? ' selected' : ''}`}>Best</div>
                        </div>
                    </div>
                    <div className="select_middle_row">
                        <div className="select_middle_row_left">
                            Resolution
                        </div>
                        <div className="select_middle_row_right">
                            <div className={`middle_item ${selectedColumnIndex === 0 ? ' selected' : ''}`}>480p</div>
                            <div className={`middle_item ${selectedColumnIndex === 1 ? ' selected' : ''}`}>480p</div>
                            <div className={`middle_item ${selectedColumnIndex === 2 ? ' selected' : ''}`}>1080p</div>
                            <div className={`middle_item ${selectedColumnIndex === 3 ? ' selected' : ''}`}>4K+HDR</div>
                        </div>
                    </div>
                    <div className="select_middle_row2">
                        <div className="select_middle_row_left">
                            Devices you can use to watch
                        </div>
                        <div className="select_middle_row_right">
                            <div className={`middle_item2 ${selectedColumnIndex === 0 ? ' selected' : ''}`}>Phone</div>
                            <div className={`middle_item2 ${selectedColumnIndex === 1 ? ' selected' : ''}`}>Phone</div>
                            <div className={`middle_item2 ${selectedColumnIndex === 2 ? ' selected' : ''}`}>Phone</div>
                            <div className={`middle_item2 ${selectedColumnIndex === 3 ? ' selected' : ''}`}>Phone</div>
                        </div>
                    </div>
                    <div className="select_middle_row2">
                        <div className="select_middle_row_left">

                        </div>
                        <div className="select_middle_row_right">
                            <div className={`middle_item2 ${selectedColumnIndex === 0 ? ' selected' : ''}`}>Tablet</div>
                            <div className={`middle_item2 ${selectedColumnIndex === 1 ? ' selected' : ''}`}>Tablet</div>
                            <div className={`middle_item2 ${selectedColumnIndex === 2 ? ' selected' : ''}`}>Tablet</div>
                            <div className={`middle_item2 ${selectedColumnIndex === 3 ? ' selected' : ''}`}>Tablet</div>
                        </div>
                    </div>
                    <div className="select_middle_row2">
                        <div className="select_middle_row_left">

                        </div>
                        <div className="select_middle_row_right">
                            <div className={`middle_item2 ${selectedColumnIndex === 0 ? ' selected' : ''}`}></div>
                            <div className={`middle_item2 ${selectedColumnIndex === 1 ? ' selected' : ''}`}>Computer</div>
                            <div className={`middle_item2 ${selectedColumnIndex === 2 ? ' selected' : ''}`}>Computer</div>
                            <div className={`middle_item2 ${selectedColumnIndex === 3 ? ' selected' : ''}`}>Computer</div>
                        </div>
                    </div>
                    <div className="select_middle_row2">
                        <div className="select_middle_row_left">

                        </div>
                        <div className="select_middle_row_right">
                            <div className={`middle_item2 ${selectedColumnIndex === 0 ? ' selected' : ''}`}></div>
                            <div className={`middle_item2 ${selectedColumnIndex === 1 ? ' selected' : ''}`}>TV</div>
                            <div className={`middle_item2 ${selectedColumnIndex === 2 ? ' selected' : ''}`}>TV</div>
                            <div className={`middle_item2 ${selectedColumnIndex === 3 ? ' selected' : ''}`}>TV</div>
                        </div>
                    </div>

                </div>
                <div onClick={()=>{navigate('/Payment')}}
                className="select_button_next">
                    Next
                </div>
            </div>
        </div >
    )
}

export default Select_plan;