export default function TextInput({metadata, value}) {
    return (
        <div className="mb-4 grid grid-cols-2 gap-4">
            <label htmlFor={metadata.name} className="text-right text-sm font-semibold mb-2">
                {metadata.label}
            </label>
            <input type="text" id={metadata.name} name={metadata.name} defaultValue={value}
                   className="w-1/2 px-3 py-2 border rounded"/>
        </div>
    );
}