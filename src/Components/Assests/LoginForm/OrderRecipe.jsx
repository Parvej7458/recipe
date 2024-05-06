import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


export default function OrderRecipe() {
    
    
    const [data, setData] = useState({
       
        amount: "",
        billAmount: ""
    });

    const [newData, setNewData] = useState([]);
    const [id, setId] = useState(undefined);

    function handleChange(e) {

        setData({ ...data, [e.target.id]: e.target.value })
        // console.log(data);
    };


    function handleSubmit(e) {
        // e.preventDefault();

        if (id === undefined) {
            axios.post("http://localhost:8080/orderrecipes/", data)
                .then((res) => {
                    console.log(res.data);
                    loadData();
                })
                    setData({
                        amount: "",
                        billAmount: ""
                    })
                
        } else {
            axios.put("http://localhost:8080/orderrecipes/" + id, data)
                .then((res) => {
                    console.log(res.data);
                    loadData();
                    setId(undefined)
                })
                    setData({
                        amount: "",
                        billAmount: ""
                    })
                
        }


    };



    // useEffect(() => {

    //     if (id !== undefined) {
    //         axios.get("http://localhost:8080/orderrecipes/" + id)
    //             .then((res) => {
    //                 console.log("res" + res.data);
    //                 setData({
    //                     amount: res.data.amount,
    //                     billAmount: res.data.billAmount
    //                 })
    //             })
    //     }
    // }, [])


    function loadData() {
        axios.get("http://localhost:8080/orderrecipes/")
            .then((res) => {
                console.log(res.data);
                setNewData(res.data)
            })
    };

    useEffect(() => {
        loadData();
        console.log(newData);
    }, []);

    function handleDelete(e, id) {
        e.preventDefault();
        axios.delete("http://localhost:8080/orderrecipes/" + id)
            .then((res) => {
                console.log(res.data);
                loadData();
            })
    }

    function handleUpdate(e, id){
        e.preventDefault()
        setId(id)
        axios.get("http://localhost:8080/orderrecipes/" + id)
        .then((res)=>{
            console.log(res.data);
            setData({
                amount: res.data.amount,
                billAmount: res.data.billAmount
            })
        })
    }

    return (
        <>

            <div class="breadcrumbs">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <p class="bread"><span> <Link to='/'><a>Home</a></Link></span> / <span>Order Recipe</span></p>
                        </div>
                    </div>
                </div>
            </div>



            <div className='bg-secondary text-white'>
                <div className="row m-3 ">

                    <div className="col-lg-6">
                        <br />
                        <label className='text' style={{ fontSize: "20px" }} htmlFor="">Amount</label>
                        <input onChange={(e) => handleChange(e)} value={data.amount} id='amount' type='double' className='form-control' />
                    </div>
                </div>

                <div className="row-m-3">
                    <div className='col-lg-6 mx-3'>
                        <label className='text' style={{ fontSize: "20px" }} htmlFor=''>Bill Amount</label>
                        <input onChange={(e) => handleChange(e)} value={data.billAmount} id='billAmount' type='double' className='form-control' />
                    </div>
                </div>

                <div className='m-3 pb-3 px-3'>
                    <button onClick={(e) => handleSubmit(e)} className='btn btn-primary'>Submit</button>
                </div>
            </div>


            <table class="table">
                <thead>
                    <tr class="bg-secondary">
                        <th>Sr.No.</th>
                        <th>Amount</th>
                        <th>Bill Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        newData.map((eachData, i) => {
                            return (
                                <tr key={i}>
                                    <th scope='row'>{i + 1}</th>
                                    <td>{eachData.amount}</td>
                                    <td>{eachData.billAmount}</td>

                                    <td>
                                        {/* <Link to={"/admin/" + eachData.id}>
                                            <button className='btn btn-primary me-1'><i class="fa-solid fa-pencil"></i></button>
                                        </Link> */}
                                        <button onClick={(e)=>handleUpdate(e, eachData.orderRecipeId)} className='btn btn-primary me-1'><i class="fa-solid fa-pencil"></i></button>
                                        <button onClick={(e) => handleDelete(e, eachData.orderRecipeId)} className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
                                    </td>

                                </tr>
                            )
                        })
                    }




                </tbody>
            </table>
        </>
    )
}
