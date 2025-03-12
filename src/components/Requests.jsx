import axios from "axios";
import { BASEURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
    const myrequest = useSelector((store) => store.request);
    const dispatch = useDispatch();
    const fetchrequests = async () => {
        try {
            const res = await axios.get(BASEURL + "/user/requests/received", {
                withCredentials: true,
            });
            dispatch(addRequest(res.data.data));
        } catch (error) {
            console.log(error);
        }
    };

    const reviewRequest = async (status, _id) => {
        try {
            console.log("clicked");
            const res = await axios.post(
                BASEURL+"/request/review/"+status+"/"+_id,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id));
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchrequests();
    }, []);

    if (!myrequest || myrequest.length === 0) {
        return <h1 className="text-center text-xl font-semibold text-gray-700">No Requests Found</h1>;
    }

    return (
        <div>
            <div className="flex flex-col items-center my-10">
                <h1 className="text-3xl font-bold text-zinc-800 mb-6">My Requests</h1>
                <div className="w-full max-w-xl">
                    {myrequest.map((request) => {
                        const { about, firstName, lastName, photoUrl, skills, _id, age, gender } = request.fromUserId;

                        return ( // ✅ Added return here
                            <div key={_id} className="my-5 p-4 bg-white rounded-xl shadow-md border border-gray-200">
                                <div className="flex items-center gap-4">
                                    {/* Profile Picture */}
                                    <img
                                        src={photoUrl || "https://via.placeholder.com/150"}
                                        alt="Profile"
                                        className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                                    />

                                    {/* User Info */}
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {firstName} {lastName}
                                        </h2>
                                        <p className="text-gray-600 text-sm">{about || "No about info available"}</p>
                                        {age && <p className="text-gray-500 text-sm mt-1">Age: {age}, {gender}</p>}

                                        {/* Skills */}
                                        {skills?.length > 0 && (
                                            <div className="mt-2">
                                                <h3 className="text-sm font-semibold text-gray-700">Skills:</h3>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {skills.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div>
                                        <button
                                            onClick={() => reviewRequest("accepted",request._id)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => reviewRequest("rejected",request._id)}
                                            className="mx-5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Requests;
