// import {useState, useEffect } from "react";

export default function AuthorForm() {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const target = e.target;
        const formData = new FormData(target);
        const authorRecord = Object.fromEntries(formData.entries());
        if (!authorRecord.code || !authorRecord.name) {
            console.log("Author Abbrv. and Name are required.");
        }
        console.log("Constructed object to create: ", authorRecord);
        const response = await fetch("http://localhost:3000/authors", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(authorRecord),
        });
        const content = await response.json();
        if (response.ok) {
            console.log(content);
        } else {
            console.log("Error creating author: ", response.status, content);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="code">Author Abbrv.</label>
                <input type="text" id="code" name="code" />
            </div>
            <div>
                <label htmlFor="name">Common Name</label>
                <input type="text" id="name" name="name" />
            </div>
            <div>
                <label htmlFor="praenomen">Praenomen</label>
                <input type="text" id="praenomen" name="praenomen" />
            </div>
            <div>
                <label htmlFor="nomen">Native Name</label>
                <input type="text" id="nomen" name="nomen" />
            </div>
            <div>
                <label htmlFor="cognomen">Cognomen</label>
                <input type="text" id="cognomen" name="cognomen" />
            </div>
            <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-400 transition">Create</button>
        </form>
    )
}