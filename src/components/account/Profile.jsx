import {useEffect, useState} from "react";
import useAuthenticatedFetch from '../../hooks/useApi.js';
import Menu from "../ui/Menu.jsx";
import {ImProfile} from "react-icons/im";
import {FaUserSecret} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {FaSquarePhone} from "react-icons/fa6";

const url = import.meta.env.VITE_ACCOUNT_URL;

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const authenticatedFetch = useAuthenticatedFetch();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await authenticatedFetch(`${url}/profile`, {
                    method: "GET",
                });
                if (response.ok) {
                    let content = await response.json();
                    setProfile(content);
                    console.log(content);
                }
            } catch (error) {
                console.log("Catching error: ", error);
            }
        }
        fetchProfile();
    }, []);

    return (
        <div className="flex w-full">
            <Menu/>
            {
                profile ? (
                    <div className="w-full mt-5">
                        <a href="/account/profile/edit"
                           className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-500 transition flex ml-auto w-15">
                            Edit
                        </a>
                        <ul className="w-full pl-3 text-left mt-5">
                            <li className="p-5 bg-gray-700 m-1 rounded">
                                <b><ImProfile className="inline"/> &nbsp;Name:</b> {profile.name}
                            </li>
                            <li className="p-5 bg-gray-700 m-1 rounded">
                                <b><FaUserSecret className="inline"/> &nbsp;User Name:</b> {profile.userName}
                            </li>
                            <li className="p-5 bg-gray-700 m-1 rounded">
                                <b><MdEmail className="inline"/> &nbsp;Email Address:</b> {profile.email}
                            </li>
                            <li className="p-5 bg-gray-700 m-1 rounded">
                                <b><FaSquarePhone className="inline"/> &nbsp;Phone:</b> {profile.phoneNumber}
                            </li>
                        </ul>
                    </div>
                ) : <div className="w-full pl-3">Loading your data...</div>
            }


        </div>
    )
}
