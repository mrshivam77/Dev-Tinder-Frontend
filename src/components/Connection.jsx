import axios from "axios";
import { BASEURL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASEURL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return <h1 className="text-center text-xl font-semibold text-gray-700">No Connections Found</h1>;

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-3xl font-bold text-zinc-800 mb-6">Connections</h1>
      <div className="w-full max-w-xl">
        {connections.map((connection) => (
          <div key={connection._id} className="my-5 p-4 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center gap-4">
              {/* Profile Picture */}
              <img
                src={connection.photoUrl || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
              />

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {connection.firstName} {connection.lastName}
                </h2>
                <p className="text-gray-600 text-sm">{connection.about || "No about info available"}</p>
        { connection.age &&<p className="text-gray-500 text-sm mt-1">Age: {connection.age+ "," +connection.gender}</p>}

                {/* Skills */}
                {connection.skills?.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-sm font-semibold text-gray-700">Skills:</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {connection.skills.map((skill, index) => (
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

              {/* Action Button */}
              <div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Chat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
