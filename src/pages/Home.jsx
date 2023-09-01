import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate();

  return (
    <div>
      <h1>Ini Home</h1>
      <div>
        <button onClick={() => navigate("/prodi")}>Prodi</button>
      </div>
    </div>
  )
}

export default Home