export default function Select({ records, label, name }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <label htmlFor={name} className="text-gray-500">{label}</label>
            <select name={name} id={name}>
                <option value="">select a {label.toLowerCase()}</option>
                {records.map((rec) => (
                    <option value={rec.id}>{rec.name}</option>
                ))}
            </select>
        </div>
    )
}