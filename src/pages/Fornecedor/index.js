import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';




function Fornecedor() {
    const baseUrl = "https://localhost:44371/api/Fornecedor";
    const [data, setData] = useState([]);
    const [modalInserir, setModalInserir] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalDeletar, setModalDeletar] = useState(false);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({
        id: '',
        nome: '',
        tipoPessoa: '',
        cpf: '',
        rg: '',
        cnpj: '',
        dataeHoraCadastro: '',
        dataNascimento: '',
        telefone: ''
    })


    const handleChange = e => {
        const { name, value } = e.target;
        setFornecedorSelecionado({
            ...fornecedorSelecionado,
            [name]: value
        });
        console.log(fornecedorSelecionado);
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
        delete fornecedorSelecionado.id;
        await axios.post(baseUrl, fornecedorSelecionado)
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
        await axios.put(baseUrl + "/" + fornecedorSelecionado.id, fornecedorSelecionado)
            .then(response => {
                var resp = response.data;
                var dataAuxiliar = data;
                dataAuxiliar.map(fornecedor => {
                    if (fornecedor.id === fornecedorSelecionado.id) {
                        fornecedor.nome = resp.nome;
                        fornecedor.tipoPessoa = resp.tipoPessoa;
                        fornecedor.cpf = resp.cpf;
                        fornecedor.rg = resp.rg;
                        fornecedor.cnpj = resp.cnpj;
                        fornecedor.dataeHoraCadastro = resp.dataeHoraCadastro;
                        fornecedor.dataNascimento = resp.dataNascimento;
                        fornecedor.telefone = resp.telefone;
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
        await axios.delete(baseUrl + "/" + fornecedorSelecionado.id)
            .then(response => {
                setData(data.filter(fornecedor => fornecedor.id !== response.data));
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

    const selecionarFornecedor = (fornecedor, caso) => {
        setFornecedorSelecionado(fornecedor);
        (caso === "Editar") ?
            abrirFecharModalEditar() : abrirFecharModalDeletar();
    }

    useEffect(() => {
        peticionGet();
    }, [])


    return (
        <div className="Fornecedor">


            <br /><br />
            <button className="btn btn-success" onClick={() => abrirFecharModalInserir()}>Adicionar Fornecedor</button>
            <br /><br />
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Tipo de Pessoa</th>
                        <th>CPF</th>
                        <th>RG</th>
                        <th>CNPJ</th>
                        <th>Data e Hora Do Cadastro</th>
                        <th>Data de Nascimento</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(fornecedor => (
                        <tr>
                            <td>{fornecedor.id}</td>
                            <td>{fornecedor.nome}</td>
                            <td>{fornecedor.tipoPessoa}</td>
                            <td>{fornecedor.cpf}</td>
                            <td>{fornecedor.rg}</td>
                            <td>{fornecedor.cnpj}</td>
                            <td>{fornecedor.dataeHoraCadastro}</td>
                            <td>{fornecedor.dataNascimento}</td>
                            <td>{fornecedor.telefone}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => selecionarFornecedor(fornecedor, "Editar")}><FontAwesomeIcon icon={faEdit} /></button> {"   "}
                                <button className="btn btn-danger" onClick={() => selecionarFornecedor(fornecedor, "Deletar")}><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                        <input type="text" className="form-control" name="id" readOnly value={fornecedorSelecionado && fornecedorSelecionado.id}></input>
                        <br />
                        <label>Nome Fantasia: </label>
                        <br />
                        <input type="text" className="form-control" name="nomeFantasia" onChange={handleChange} value={fornecedorSelecionado && fornecedorSelecionado.nomeFantasia}  ></input>
                        <br />
                        <label>UF: </label>
                        <br />
                        <input type="text" className="form-control" name="uf" onChange={handleChange} value={fornecedorSelecionado && fornecedorSelecionado.uf}></input>
                        <br />
                        <label>CNPJ: </label>
                        <br />
                        <input type="text" className="form-control" name="cnpj" onChange={handleChange} value={fornecedorSelecionado && fornecedorSelecionado.cnpj}></input>
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
                    Tem certeza que deseja deletar ? {fornecedorSelecionado && fornecedorSelecionado.nomeFantasia}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => peticionDelete()}>Sim</button>{"   "}
                    <button className="btn btn-secondary" onClick={() => abrirFecharModalDeletar()}>Não</button>
                </ModalFooter>
            </Modal>



        </div>


    );
}

export default Fornecedor;