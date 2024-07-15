function Select({
    data, register, className
}: any) {
    const defaultClassName = "text-slate-400 rounded-md w-2/3 outline-none p-2"

    return (
        <select
            className={className ? className : defaultClassName}
            {...register}
        >
            {data?.map((element: any) => (
                <option key={element.value} value={element.value}>
                    {element.text ? element.text : element.city}
                </option>
            ))}
        </select>
    )
}

export default Select
