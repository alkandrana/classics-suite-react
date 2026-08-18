import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useAuthenticatedFetch from "../../hooks/useApi.js"

export default function ProfileForm() {
    const [user, setUser] = useState(null);
    const authenticatedFetch = useAuthenticatedFetch();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await authenticatedFetch(`https://localhost:7192/profile`);
            const content = await res.json();
            if (res.ok) {
                setUser(content);
                console.log(content);
            } else {
                console.log("Error fetching user: ", content);
            }
        }
        fetchUser();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        let target = e.target;
        const formData = new FormData(target);
        const user = Object.fromEntries(formData.entries());
        const options = {
            method: "PUT",
            body: JSON.stringify(user),
        }
        const res = await authenticatedFetch(`https://localhost:7192/profile`, options);
        const content = await res.json();
        if (res.ok) {
            console.log("Profile successfully updated");
        } else {
            console.log("Error updating user: ", content);
        }
    }

    return user && (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3 mx-auto">
                <label htmlFor="name" className="text-sm font-medium text-gray-400">Name:</label>
                <input type="text" id="name" name="name" defaultValue={user.name}
                       className="border border-blue-600 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3 mx-auto">
                <label htmlFor="userName" className="text-sm font-medium text-gray-400">User Name:</label>
                <input type="text" id="userName" name="userName" defaultValue={user.userName}
                       className="border border-blue-600 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3 mx-auto">
                <label htmlFor="email" className="text-sm font-medium text-gray-400">Email:</label>
                <input type="email" id="email" name="email" defaultValue={user.email}
                       className="border border-blue-600 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3 mx-auto">
                <label htmlFor="phone" className="text-sm font-medium text-gray-400">Phone Number:</label>
                <input type="tel" id="phone" name="phone" defaultValue={user.phone}
                       className="border border-blue-600 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3 ml-auto">
                <button type="submit"
                        className="bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-800 transition">Submit
                </button>
                <a href="/account/profile"
                   className="bg-amber-500 text-white rounded-lg p-3 hover:bg-amber-800 transition">Cancel</a>
            </div>

        </form>
    )
}