function Button({ tambah, kurang }: any) {


    return (
        <button className="bg-blue-500 w-fit" onClick={tambah}>Klik Buat increment</button>
    )
}

export default Button;