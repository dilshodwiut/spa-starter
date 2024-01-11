import { useNavigate } from "react-router-dom";

export default function NotFound(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="bg-[#40916C]"
      onClick={() => {
        navigate("/");
      }}
    >
      Back Home
    </button>
  );
}
