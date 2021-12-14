import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './App.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


function App() {
  const baseUrl = "https://localhost:44371/api/Empresa";
  const [data, setData] = useState([]);
  const [modalInserir, setModalInserir] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState({
    nomeFantasia: '',
    uf: '',
    cnpj: ''
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setEmpresaSelecionada({
      ...empresaSelecionada,
      [name]: value
    });
    console.log(empresaSelecionada);
  }

  const abrirFecharModalInserir = () => {
    setModalInserir(!modalInserir);
  }


  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error)
      })
  }

  const peticionPost = async () => {
    await axios.post(baseUrl, empresaSelecionada)
      .then(response => {
        abrirFecharModalInserir()
        setData(data.concat(response.data));

      }).catch(error => {
        if (error.response) {

          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {

          console.log(error.request);
        } else {

          console.log('Error', error.message);

        }
      });




  }
  useEffect(() => {
    peticionGet();
  }, [])


  return (
    <div className="App">
      <br /><br />
      <button className="btn btn-success" onClick={() => abrirFecharModalInserir()}>Adicionar Empresa</button>
      <br /><br />
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Fantasia</th>
            <th>UF</th>
            <th>CNPJ</th>
          </tr>
        </thead>
        <tbody>
          {data.map(empresa => (
            <tr>
              <td>{empresa.id}</td>
              <td>{empresa.nomeFantasia}</td>
              <td>{empresa.uf}</td>
              <td>{empresa.cnpj}</td>
              <td>
                <button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} /></button> {"   "}
                <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <Modal isOpen={modalInserir}>
        <ModalHeader>Inserir Emrpesa</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome Fantasia: </label>
            <br />
            <input type="text" className="form-control" name="nomeFantasia" onChange={handleChange}></input>
            <br />
            <label>UF: </label>
            <br />
            <input type="text" className="form-control" name="uf" onChange={handleChange}></input>
            <br />
            <label>CNPJ: </label>
            <br />
            <input type="text" className="form-control" name="cnpj" onChange={handleChange}></input>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPost()} >Inserir</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirFecharModalInserir()}>Cancelar</button>
        </ModalFooter>
      </Modal>

    </div>


  );
}

export default App;
