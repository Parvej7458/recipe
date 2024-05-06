import React from 'react'
// import './Assets/css/Units.css'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Units() {
    const [data, setData] = useState({
        name: ""
    })
    const [newUnit, setNewUnit] = useState([])
    const [id, setId] = useState(undefined)

    let navigate = useNavigate()

    function handleChange(e) {
        setData({ ...data, [e.target.id]: e.target.value })

    }
    function handleSubmit(e) {
        e.preventDefault();

        if (id === undefined) {
            axios.post("http://localhost:8080/units/", data)
                .then((res) => {
                    console.log(res.data);
                    loadData();
                })
            setData({
                name: ""
            })

        }
        else {
            axios.put(`http://localhost:8080/units/ ${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    loadData();
                    setId(undefined)
                })
            setData({
                name: ""
            })

        }


    }

    function loadData() {
        axios.get("http://localhost:8080/units/")
            .then((res) => {
                console.log(res.data);
                setNewUnit(res.data)
            })

    }

    useEffect(() => {
        loadData();
        console.log(newUnit);

    }, [])

    function handleDelete(e, id) {
        e.preventDefault();
        axios.delete("http://localhost:8080/units/" + id)
            .then((res) => {
                console.log(res.data);
                loadData();
            })

    }
    function handleUpdate(e, id) {
        e.preventDefault()
        setId(id)
        axios.get(`http://localhost:8080/units/ ${id}`, data)
            .then((res) => {
                console.log(res.data);
                setData({
                    name: res.data.unitsname
                })

            })

    }


    return (
        <>
            <div>
                <div className="row">

                    <div className="col-lg-10" style={{ marginTop: "68px" }}>
                        <div>
                            <div className="container">
                                <div className="row">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <a className="breadcrumb-item" href="/admin/dashboard"><a>Home</a></a>
                                            <a className="breadcrumb-item active" aria-current="page">Units</a>
                                            <div className="mb-3 col-lg-12 d-flex justify-content-end">
                                                <button type="button" className="btn btn-primary ms-2 " data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>
                                            </div>
                                        </ol>
                                    </nav>
                                    <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: "none;" }} aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content bg-dark">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Product</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                    </button>
                                                </div>
                                                <div className="modal-body"><div className="row">
                                                    <div className="row">
                                                        <div className="col-lg-1">
                                                        </div>
                                                        <div className="mb-3 col-lg-10">
                                                            <label className="form-label">Name</label>
                                                            <input name='unit' onChange={(e) => handleChange(e)} id="name" value={data.unitsname} type='text' className="form-control" placeholder='Unit' />
                                                        </div>
                                                        <div className="col-lg-1">
                                                        </div>
                                                    </div>

                                                </div>


                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                                        <button onClick={(e) => handleSubmit(e)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border-warning " >
                                        <div className="card-body">
                                            <table className="table table-dark table-hover ">
                                                <thead>
                                                    <tr class='text-center'>
                                                        <th scope="col">Sr.</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>{
                                                    newUnit.map((eachData, i) => {
                                                        return (
                                                            <tr class='text-center'>

                                                                <td>{i + 1}</td>
                                                                <td>{eachData.name}</td>

                                                                <td>
                                                                    <button onClick={(e) => handleUpdate(e, eachData.unitsId)} className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-pen-to-square"></i></button>
                                                                    <button onClick={(e) => handleDelete(e, eachData.unitsId)} className="btn btn-danger ml-2"><i className="fa-solid fa-trash-can"></i></button>
                                                                </td>
                                                            </tr>


                                                        )
                                                    })

                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}
