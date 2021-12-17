import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';




function Empresa() {
    const baseUrl = "https://localhost:44371/api/Empresa";
    const [data, setData] = useState([]);
    const [modalInserir, setModalInserir] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalDeletar, setModalDeletar] = useState(false);
    const [empresaSelecionada, setEmpresaSelecionada] = useState({
        id: '',
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
    const abrirFecharModalEditar = () => {
        setModalEditar(!modalEditar);
    }
    const abrirFecharModalDeletar = () => {
        setModalDeletar(!modalDeletar);
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
        delete empresaSelecionada.id;
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
            })
    }

    const peticionPut = async () => {
        await axios.put(baseUrl + "/" + empresaSelecionada.id, empresaSelecionada)
            .then(response => {
                var resp = response.data;
                var dataAuxiliar = data;
                dataAuxiliar.map(empresa => {
                    if (empresa.id === empresaSelecionada.id) {
                        empresa.nomeFantasia = resp.nomeFantasia;
                        empresa.uf = resp.uf;
                        empresa.cnpj = resp.cnpj
                    }
                })
                setData(data.concat(response.data));
                abrirFecharModalEditar();
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
            })
    }
    const peticionDelete = async () => {
        await axios.delete(baseUrl + "/" + empresaSelecionada.id)
            .then(response => {
                setData(data.filter(empresa => empresa.id !== response.data));
                abrirFecharModalDeletar();
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
            })
    }

    const selecionarEmpresa = (empresa, caso) => {
        setEmpresaSelecionada(empresa);
        (caso === "Editar") ?
            abrirFecharModalEditar() : abrirFecharModalDeletar();
    }

    useEffect(() => {
        peticionGet();
    }, [])


    return (
        <div className="Empresa">


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
                                <button className="btn btn-primary" onClick={() => selecionarEmpresa(empresa, "Editar")}><FontAwesomeIcon icon={faEdit} /></button> {"   "}
                                <button className="btn btn-danger" onClick={() => selecionarEmpresa(empresa, "Deletar")}><FontAwesomeIcon icon={faTrashAlt} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <Modal isOpen={modalInserir}>
                <ModalHeader>Inserir Emrpesa</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label>
                        <br />
                        <input type="text" className="form-control" readOnly></input>
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





            <Modal isOpen={modalEditar}>
                <ModalHeader>Inserir Emrpesa</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label>
                        <br />
                        <input type="text" className="form-control" name="id" readOnly value={empresaSelecionada && empresaSelecionada.id}></input>
                        <br />
                        <label>Nome Fantasia: </label>
                        <br />
                        <input type="text" className="form-control" name="nomeFantasia" onChange={handleChange} value={empresaSelecionada && empresaSelecionada.nomeFantasia}  ></input>
                        <br />
                        <label>UF: </label>
                        <br />
                        <input type="text" className="form-control" name="uf" onChange={handleChange} value={empresaSelecionada && empresaSelecionada.uf}></input>
                        <br />
                        <label>CNPJ: </label>
                        <br />
                        <input type="text" className="form-control" name="cnpj" onChange={handleChange} value={empresaSelecionada && empresaSelecionada.cnpj}></input>
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => peticionPut()} >Inserir</button>{"   "}
                    <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalDeletar}>
                <ModalHeader>Inserir Emrpesa</ModalHeader>
                <ModalBody>
                    Tem certeza que deseja deletar ? {empresaSelecionada && empresaSelecionada.nomeFantasia}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => peticionDelete()}>Sim</button>{"   "}
                    <button className="btn btn-secondary" onClick={() => abrirFecharModalDeletar()}>Não</button>
                </ModalFooter>
            </Modal>



        </div>


    );
}

export default Empresa;