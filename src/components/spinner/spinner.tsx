import { ClipLoader } from "react-spinners";

function Spinner() {
  const style: any = {
    marginTop: "5rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "100%",
    zIndex: 50,
  };

  return (
    <div style={style}>
      <ClipLoader color={"#123abc"} />
    </div>
  );
}

export default Spinner;
