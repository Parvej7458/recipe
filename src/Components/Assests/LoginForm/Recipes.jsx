import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


export default function Recipes() {


  const [data, setData] = useState({
    name: "",
    quantity: "",
    description: ""
  });

  const [newData, setNewData] = useState([]);
  const [id, setId] = useState(undefined);


  function handleChange(e) {

    setData({ ...data, [e.target.id]: e.target.value })
    // console.log(data);
  };


  function handleSubmit(e) {
    e.preventDefault();

    if (id === undefined) {
      axios.post("http://localhost:8080/recipes/", data)
        .then((res) => {
          console.log(res.data);
          loadData();
        })
      setData({
        name: "",
        quantity: "",
        description: ""
      })

    } else {
      axios.put("http://localhost:8080/recipes/" + id, data)
        .then((res) => {
          console.log(res.data);
          loadData();
          setId(undefined)
        })
      setData({

        name: "",
        quantity: "",
        description: ""
      })

    }


  };

  function loadData() {
    axios.get("http://localhost:8080/recipes/")
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
    // alert(id)
    axios.delete("http://localhost:8080/recipes/" + id)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
  }

  function handleUpdate(e, id) {
    e.preventDefault()
    // alert(id)
    setId(id)
    axios.get("http://localhost:8080/recipes/" + id, data)
      .then((res) => {
        console.log(res.data);
        setData({
          name: res.data.name,
          quantity: res.data.quantity,
          description: res.data.description
        })
      })
  }

  return (
    <>

      <div class="breadcrumbs">
        <div class="container">
          <div class="row">
            <div class="col">
              <p class="bread"><span> <Link to='/'><a>Home</a></Link></span> / <span>Recipes</span></p>
            </div>
          </div>
        </div>
      </div>



      <div className='bg-secondary text-white'>
        <div className="row m-3 ">

          <div className="col-lg-6">
            <br />
            <label className='text' style={{ fontSize: "20px" }} htmlFor="">Name</label>
            <input onChange={(e) => handleChange(e)} value={data.name} id='name' type='text' className='form-control' />
          </div>
        </div>

        <div className='col-lg-5 mx-3'>

          <label className='text' style={{ fontSize: "20px" }} htmlFor=''>Quantity</label>
          <input onChange={(e) => handleChange(e)} value={data.quantity} id='quantity' type='double' className='form-control' />
        </div>

        <div className="row m-3">
          <div className="col-lg-4">
            <label className='text' style={{ fontSize: "20px" }} htmlFor="">Description</label>
            <input onChange={(e) => handleChange(e)} value={data.description} id='description' type='text' className='form-control' />
          </div>
        </div>

        <div className='m-3 pb-3 px-3'>
          <button onClick={(e) => handleSubmit(e)} className='btn btn-primary'>Submit</button>
        </div>
      </div>


      <table class="table">
        <thead>
          <tr class="bg-secondary text-center">
            <th>Sr.No.</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            newData.map((eachData, i) => {
              // console.log(eachData);
              return (
                <tr key={i} class='text-center'>
                  <th scope='row'>{i + 1}</th>
                  <td>{eachData.name}</td>
                  <td>{eachData.quantity}</td>
                  <td>{eachData.description}</td>

                  <td>
                    <button onClick={(e) => handleUpdate(e, eachData.recipeId)} className='btn btn-primary me-1'><i class="fa-solid fa-pencil"></i></button>
                    <button onClick={(e) => handleDelete(e, eachData.recipeId)} className='btn btn-danger me-1'><i class="fa-solid fa-trash"></i></button>
                    {/* <button onClick={(e) => handleChange(e, eachData.recipeItemId)} className='btn btn-success '>Item</button>
                     */}
                     <Link to={"/admin/recipeitems/" + eachData.recipeId}>
                      <button className='btn btn-success me-1'>Item</button>
                    </Link> 
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
