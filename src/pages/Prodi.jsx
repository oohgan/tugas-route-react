import {useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";


function Prodi() {
  const getNPM = (tahun_masuk, kode_prodi, id)=> {
    const tahunMaasuk = tahun_masuk.slice(-2);
    const tahunLulus = parseInt(tahunMaasuk)+4;
    const kodeUnik = ("000" + id).slice(-4);
    return tahunMaasuk + tahunLulus + kode_prodi + kodeUnik
  }

  const [prodis, setProdis] = useState([])

  useEffect(() => {
    const fetchData = async ()=>{
      const res = await axios.get("https://strapi-rygs.onrender.com/api/prodis");
    setProdis(res.data.data[0].attributes.prodi[0]);
    };
    fetchData();
  }, []);
  const navigate = useNavigate();


  return (
    <>
      {prodis.map((prodi, i) => (
        <div key={i}>
          <ul>
            <li>{prodi.nama_prodi}</li>
            <li>Kepala: {prodi.kepala_prodi}</li>
            {prodi.sektretaris && <li>Sekretaris: {prodi.sektretaris}</li>}
          </ul>

          {prodi.mahasiswa.map((angkatan, j) => {
            const kelas = Object.entries(angkatan.data);
            return (
              <div key={j}>
                <div>
                  Angkatan: {angkatan.tahun_masuk}
                </div>

                {kelas.map((item, k) => (
                  <div key={k}>
                    <div>
                      Kelas <span className="kelas">{item[0]}</span>
                    </div>

                    {item[1].length > 0 ? (
                      <table border="1">
                        <thead>
                          <tr>
                            <th>NPM</th>
                            <th>Nama</th>
                            <th>Jenis Kelamin</th>
                            <th>Alamat</th>
                            <th>Hobi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item[1].map((mahasiswa, l) => (
                            <tr>
                              <td>
                                <a href="" onClick={() => navigate(`/mahasiswa/${getNPM(angkatan.tahun_masuk, prodi.kode_prodi, mahasiswa.id)}`)}>
                                  {getNPM(angkatan.tahun_masuk,prodi.kode_prodi,mahasiswa.id)}
                                </a>
                              </td>
                              <td>{mahasiswa.nama}</td>
                              <td>{mahasiswa.jenis_kelamin=="P" ? "Perempuan" : "Laki-laki"}</td>
                              <td>{mahasiswa.alamat}</td>
                              <td>{mahasiswa.hobi.join(", ")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div>Tidak Ada Mahasiswa yang mengamnbil kelas ini.</div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </>
  )
}

export default Prodi
