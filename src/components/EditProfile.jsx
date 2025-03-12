import { motion } from "framer-motion";
import { useState } from "react";
import UserCard from "./UserCard";
import { BASEURL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const EditProfile = ({ user }) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || " ");
    const [skills, setSkills] = useState(user.skills || []);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [gender, setGender] = useState(user.gender || " ");
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.patch(
                BASEURL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                    skills,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setInterval(() => {
                setShowToast(false);
            }, 2000);
        } catch (error) {
            setError(error?.response?.data || "SOMETHING WENT WRONG");
        }
    };

    // Animation Variants
    const cardVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const fieldVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: (custom) => ({
            opacity: 1,
            x: 0,
            transition: { delay: custom * 0.2, duration: 0.5 },
        }),
    };

    const buttonVariants = {
        hover: { scale: 1.1, transition: { duration: 0.2 } },
        tap: { scale: 0.95 },
    };

    return (
        <div>
            <div className="flex justify-center flex-col md:flex-row my-10">
                {/* Animate the Card */}
                <motion.div
                    className="card bg-base-300 w-full md:w-96 shadow-sm mb-6 md:mb-0 overflow-auto"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="card-body">
                        {/* Card Title */}
                        <h2 className="card-title justify-center">Update Profile</h2>
                        <div>
                            {/* First Name */}
                            <motion.label
                                className="form-control w-full py-4"
                                custom={1}
                                variants={fieldVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="label">
                                    <span className="label-text">First Name</span>
                                </div>
                                <input
                                    value={firstName}
                                    type="text"
                                    className="input input-bordered w-full"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </motion.label>

                            {/* Last Name */}
                            <motion.label
                                className="form-control w-full py-4"
                                custom={2}
                                variants={fieldVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="label">
                                    <span className="label-text">Last Name</span>
                                </div>
                                <input
                                    value={lastName}
                                    type="text"
                                    className="input input-bordered w-full"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </motion.label>

                            {/* Age */}
                            <motion.label
                                className="form-control w-full py-4"
                                custom={3}
                                variants={fieldVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="label">
                                    <span className="label-text">Age</span>
                                </div>
                                <input
                                    value={age}
                                    type="number"
                                    className="input input-bordered w-full"
                                    min="18"
                                    max="100"
                                    step="1"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </motion.label>

                            {/* Gender */}
                            <motion.label
                                className="form-control w-full py-4"
                                custom={4}
                                variants={fieldVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="label">
                                    <span className="label-text">Gender</span>
                                </div>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="select input-bordered w-full"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                            </motion.label>

                            {/* Photo URL */}
                            <motion.label
                                className="form-control w-full py-4"
                                custom={5}
                                variants={fieldVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="label">
                                    <span className="label-text">Photo URL</span>
                                </div>
                                <input
                                    value={photoUrl}
                                    type="text"
                                    className="input input-bordered w-full"
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </motion.label>

                            {/* About */}
                            <motion.label
                                className="form-control w-full py-4"
                                custom={6}
                                variants={fieldVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="label">
                                    <span className="label-text">About</span>
                                </div>
                                <textarea
                                    value={about}
                                    className="textarea text-bordered w-full"
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </motion.label>

                            {/* Skills */}
                            <motion.label
                                className="form-control w-full py-4"
                                custom={7}
                                variants={fieldVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="label">
                                    <span className="label-text">Skills</span>
                                </div>
                                <input
                                    value={skills.join(", ")}
                                    type="text"
                                    className="input input-bordered w-full"
                                    onChange={(e) => {
                                        const skillsArray = e.target.value
                                            .split(",")
                                            .map((skill) => skill.trim());
                                        setSkills(skillsArray);
                                    }}
                                />
                            </motion.label>

                            <p className="text-red-500">{error}</p>
                        </div>

                        {/* Save Profile Button */}
                        <div className="card-actions justify-center">
                            <motion.button
                                onClick={saveProfile}
                                className="btn btn-primary"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                SAVE PROFILE
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* User Card Preview */}
                <div className="ml-8 md:ml-0 mt-6 md:mt-0 md:ml-8">
                    <UserCard
                        user={{
                            firstName,
                            lastName,
                            age,
                            skills,
                            about,
                            gender,
                            photoUrl,
                        }}
                    />
                </div>
            </div>

            {/* Toast Message */}
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile Updated Successfully</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
