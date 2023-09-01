import {useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';



function Mahasiswa() {
  const [mahasiswa, setMahasiswas] = useState([])
  const NPM = useParams();
  console.log(NPM);

  useEffect(() => {
    const fetchData= async () => {
      const res = await axios.get("https://strapi-rygs.onrender.com/api/prodis");
      setMahasiswas(res.data.data[0]);
    };
    fetchData();
  }, [NPM]);
  
  return(
  <>
    <h1>Data Mahasiswa</h1>
    <div>
      <p>NPM : {NPM}</p>
      <p>Nama : {mahasiswa.nama}</p>
      <p>Jenis Kelamin : {mahasiswa.get=="P" ? "Perempuan" : "Laki-laki"}</p>
      <p>Alamat : {mahasiswa.alamat}</p>
      <p>Hobi : {mahasiswa.hobi.join(", ")}</p>
    </div>
  </>
  )
}

export default Mahasiswa