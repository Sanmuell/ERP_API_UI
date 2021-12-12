import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './App.css';
import { useEffect , useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
const baseUrl="https://localhost:44371/api/Empresa"

const [data, setData]=useState([]);

const peticionGet=async()=>{
  await axios.get(baseUrl)
.then(response =>{
  setData(response.data);
}).catch(error =>{
  console.log(error)  
})
}

useEffect(()=>{
  peticionGet();
},[])


return (
  <div className="App">
<br/>
<button className="btn btn-success">Adicionar Empresa</button>
<br/><br/>
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
    {data.map(empresa=>(
      <tr>
        <td>{empresa.id}</td>
        <td>{empresa.nomeFantasia}</td>
        <td>{empresa.uf}</td>
        <td>{empresa.cnpj}</td>
        <td>
          <button className="btn btn-primary"><FontAwesomeIcon icon={faEdit}/></button> {"   "}
          <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt}/></button>
        </td>
      </tr>
      

))}
    </tbody>
  </table>
</div>

 
  );
}

export default App;
