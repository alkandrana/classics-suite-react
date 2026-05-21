// formData is an object of form: { fieldName: "Field Name" } for each input field
// actionRef is the name of a function that handles form submission
export default function Form({formData, actionRef, theme}) {
    const formKeys = Object.keys(formData);
    return (
        <form onSubmit={actionRef} className={`w-1/2 mx-auto ${theme} p-3`}>
            {formKeys.map(key =>
                (
                    <div key={key} className="grid grid-cols-2 gap-4 pb-3">
                        <label htmlFor={key} className="text-left">{formData[key].label}</label>
                        <input type={formData[key].type} name={key} id={key} className="border border-green-800"/>
                    </div>
                ))
            }
            <button type="submit" className="btn bg-blue-600">Submit</button>
        </form>
    )
}