const TodoInputSubmit = ({value, onChange, onSubmit}) => {
    return (
        <div className="space-y-1">
            <input
                type="text"
                className="w-full bg-gray-200 rounded-4 py-1 px-2"
                value={value}
                required
                placeholder="Enter TODO Name"
                onChange={onChange}
            />
            <button onClick={onSubmit} className="w-full text-white bg-blue-500 py-2">Submit</button>
        </div>
    );
}

export default TodoInputSubmit;