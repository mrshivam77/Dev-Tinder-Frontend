import { useState } from "react";
import { BASEURL } from "../utils/constants";
import axios from "axios";
const Premium = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  
    
    const handleBuyClick=async(membershiptype)=>{
      try {
        
        const order =await axios.post(BASEURL+"/payment/create",{
        membershiptype,
        },
      {withCredentials:true})
      
      const {amount,keyId,currency,notes,orderId}=order.data;
       const options = {
        key: keyId, 
        amount: amount, 
        currency: currency,
        name: 'DEV TINDER',
        description: 'Test Transaction',
        order_id:orderId, 
        prefill: {
          name: notes.firstName+" "+notes.lastName,
          email: notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };
      const rzp=new window.Razorpay(options);
      rzp.open();
      } catch (error) {
        console.log(error.messaage);
        
      }
    
    }
  

  return (
    <div className="flex justify-center p-2.5 mt-2.5 gap-8">
      {/* Gold Membership */}
      <div>
        <div className="card w-96 bg-base-100 shadow-sm">
          <div className="card-body">
            <span className="badge badge-xs badge-warning">New Offer</span>
            <div className="flex justify-between">
              <h2 className="text-3xl text-yellow-700 font-bold">Gold Membership</h2>
              <span className="text-xl">300/mo</span>
            </div>
            <ul className="mt-6 flex flex-col gap-2 text-xs">
              <li>✅ Unlimited Chat</li> 
              <li>✅ More than 10 skills</li>
              <li>✅ Beta Versions</li>
              <li>✅ Multiple Images</li>
              <li className="opacity-50">❌ Verified Badge</li>
              <li className="opacity-50">❌ Call Option</li>
            </ul>
            <div className="mt-6">
              <button
                className="btn btn-primary btn-block"
                onMouseEnter={() => setHoveredButton("gold")}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={()=>handleBuyClick("gold")}
                  
              >
                {hoveredButton === "gold" ? "Go Premium" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Platinum Membership */}
      <div>
        <div className="card w-96 bg-base-100 shadow-sm">
          <div className="card-body">
            <span className="badge badge-xs badge-warning">Most Popular</span>
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold text-slate-300">Platinum Membership</h2>
              <span className="text-xl">700/3mo</span>
            </div>
            <ul className="mt-6 flex flex-col gap-2 text-xs">
              <li>✅ Unlimited Chat</li>
              <li>✅ More than 10 skills</li>
              <li>✅ Beta Versions</li>
              <li>✅ Multiple Images</li>
              <li>✅ Verified Badge</li>
              <li>✅ Call Option</li>
            </ul>
            <div className="mt-6">
              <button
                className="btn btn-primary btn-block"
                onMouseEnter={() => setHoveredButton("platinum")}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={()=>handleBuyClick("platinum")}
              >
                {hoveredButton === "platinum" ? "Upgrade Now" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
