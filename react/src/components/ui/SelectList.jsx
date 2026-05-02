// field = object representing a record property and its metadata
export default function SelectList({field, currentValue}) {
    console.log("In Select Component: ", field.valueList);
    return (
        <div className="mb-4 grid grid-cols-2 gap-4">
            <label htmlFor={field.name} className="text-right text-sm font-semibold mb-2">{field.label}</label>
            <select name={field.name} id={field.name} defaultValue={currentValue}
                    className="w-1/2 px-3 py-2 border rounded">
                <option value="">select a {field.label}</option>
                {
                    field.valueList.map(item => {
                        return <option key={item.id} value={item.id}>{item.name}</option>
                    })}
            </select>
        </div>
    )
}