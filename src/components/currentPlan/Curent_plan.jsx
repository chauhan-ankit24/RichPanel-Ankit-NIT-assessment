import './Current_plan.css'
import { useGlobalContext } from "../../StateContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Curent_plan = () => {
  const navigate = useNavigate();
  const { user, setuser } = useGlobalContext();

  const devices = user.plan.devices;
  const formattedDevices = devices.join(" + ");

  const price = user.plan.price;
  const cycle = user.plan.cycle;
  const cycleText = cycle === "monthly" ? "/mo" : "/yr";

  const subscriptionStartDate = new Date(user.plan.dateofsubscription);
  const planCycle = user.plan.cycle;

  const renewalDate = new Date(subscriptionStartDate);
  if (planCycle === "monthly") {
    renewalDate.setMonth(renewalDate.getMonth() + 1);
  } else if (planCycle === "yearly") {
    renewalDate.setFullYear(renewalDate.getFullYear() + 1);
  }
  renewalDate.setDate(renewalDate.getDate() + 1);

  function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);

    const day = date.getDate();
    const suffix = getDaySuffix(day);

    return formattedDate.replace(`${day}`, `${day}${suffix}`);
  }

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  const formattedStartDate = formatDate(subscriptionStartDate);
  const formattedRenewalDate = formatDate(renewalDate);

  const handleCancel = async () => {
    try {
      const updatedUser = {
        ...user,
        plan: {
          cycle: null,
          name: null,
          price: null,
          devices: [],
          state: "cancelled",
          dateofsubscription: null,
        },
      };

      const { data } = await axios.put(
        "https://richpanel-ankit-nit-assessment-backend.onrender.com/UpdateUser",
        updatedUser
      );

      setuser({
        ...user,
        plan: {
          ...user?.plan,
          state: "cancelled",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='CurrentMain'>
      <div className="CurretnContainer">
        <div className="CurretnContainer_item1">
          <div className="CurretnContainer_item_in1">
            <div className='CurretnContainer_item_in11'>
              Current Plan Details
            </div>
            {user.plan.state === "active" ?
              <div className='CurretnContainer_item_in12'>
                Active
              </div> :
              <div className='CurretnContainer_item_in122'>
                Cancelled
              </div>}

            <div className='CurretnContainer_item_in13'>

            </div>
          </div >
          <div className="CurretnContainer_item_in2">
            {user.plan.state === "active" ?
              <div className='' onClick={handleCancel}>
                Cancel
              </div> :
              <div className=''>

              </div>}
          </div>
        </div>
        <div className="CurretnContainer_item2">
          <div className='CurretnContainer_item2_in1'>
            {user.plan.name}
          </div>
          <div className="CurretnContainer_item2_in2">
            {formattedDevices}
          </div>
        </div>
        <div className="CurretnContainer_item3">
          {price && (
            <>
              <span className="price">{price}</span>
              <span className="cycle">{cycleText}</span>
            </>
          )}
        </div>
        <div className="CurretnContainer_item4">
          <button className="CurretnContainer_item4_button" onClick={() => navigate("/Plan")}>
            {user.plan.state === "active" ? "Change Plan" : "Choose Plan"}
          </button>
        </div>
        <div className="CurretnContainer_item5">
          {user.plan.state === "active" ? `Your subsciption has started from ${formattedStartDate} and will auto renew on ${formattedRenewalDate}.` : `Your subsciption was cancelled and you will loose access to services on ${formattedStartDate}.`}

        </div>
      </div>
    </div>
  )
}

export default Curent_plan
