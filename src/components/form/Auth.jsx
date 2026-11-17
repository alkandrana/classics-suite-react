import SimpleInput from "./SimpleInput";
export default function Auth({handleSubmitForm}){
    return (
        <form onSubmit={handleSubmitForm}>
            <SimpleInput name="email" label="Email" datatype="email" />
            <SimpleInput name="password" label="Password" datatype="password" />
            <button type="submit" className="bg-green-600 p-3 rounded">Submit</button>
        </form>
    )
}
