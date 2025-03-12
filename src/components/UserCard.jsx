import axios from "axios";
import { BASEURL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
    const dispatch=useDispatch();
    
    const {_id ,firstName, lastName, age, skills, about, gender, photoUrl } = user;
    const handleSendRequest=async(status,userid)=>{
    
    try{
        const res=axios.post(BASEURL+"/request/send/"+status+"/"+userid,{},{
        withCredentials:true,
    })
    dispatch(removeUserFromFeed(userid)); 
    }
          catch (error) {
            console.log(error);
            
        
    }
    }
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure className="w-full h-100 overflow-hidden">
                <img
                    src={photoUrl}
                    alt="Photo"
                    className="w-full h-full object-cover rounded-t-xl" // Ensures image covers the area without distorting
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <div className="flex">
                    {age && gender && <p>{age + ", " + gender}</p>}
                </div>

                {/* About Section */}
                {about && (
                    <p className="text-wrap break-words mb-4">{about}</p>
                )}

                {/* Skills Section */}

{skills?.length > 0 && (
    <div className="mt-3">
        <h3 className="text-sm font-semibold text-gray-100 mb-1">Skills:</h3>
        <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
                <span
                    key={index}
                    className="px-3 py-1 text-xs bg-blue-200 text-blue-900 font-medium rounded-lg"
                >
                    {skill}
                </span>
            ))}
        </div>
    </div>
)}

                <div className="card-actions justify-center mt-4">
                    <button className="btn btn-secondary"
                    onClick={()=>handleSendRequest("ignored",_id)}
                    >Ignored</button>
                    <button className="btn btn-primary"
                    onClick={()=>handleSendRequest("interested",_id)}

                    >Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
