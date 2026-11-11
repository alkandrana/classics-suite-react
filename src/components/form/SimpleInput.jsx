export default function SimpleInput({ label, name, datatype }) {
    return (
        <div key={name} className="grid grid-cols-2 gap-2">
            <label htmlFor={name} className="text-gray-500">{label}</label>
            <input type={datatype} name={name} className="border" />
        </div>
    )
}