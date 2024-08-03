export function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow`}
        style={{
          ...style,
          display: "flex", // Gunakan flex untuk penempatan yang lebih mudah
          alignItems: "center", // Pusatkan vertikal
          justifyContent: "center", // Pusatkan horizontal
          background: "rgba(0, 0, 0, 0.5)", // Latar belakang transparan untuk visibilitas
          color: "white",
          border: "none",
          fontSize: "30px", // Sesuaikan ukuran sesuai kebutuhan
          borderRadius: "50%", // Bulatkan tombol
          width: "50px", // Ukuran lingkaran panah
          height: "50px", // Ukuran lingkaran panah
          position: "absolute",
          top: "50%", // Tempatkan di tengah secara vertikal
          right: "10px", // Jarak dari kanan
          transform: "translateY(-50%)", // Pusatkan secara vertikal
          zIndex: 25,
          cursor: "pointer", // Pointer untuk menunjukkan bisa diklik
        }}
        onClick={onClick}
      />
    );
  }
  
  export function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow`}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          fontSize: "30px",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          position: "absolute",
          top: "50%",
          left: "10px", // Jarak dari kiri
          transform: "translateY(-50%)",
          zIndex: 25,
          cursor: "pointer",
        }}
        onClick={onClick}
      ></div>
    );
  }