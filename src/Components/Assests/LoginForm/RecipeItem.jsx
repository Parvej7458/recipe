import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


export default function RecipeItem() {
  const { id } = useParams();

  const [data, setData] = useState({

    recipeId: id,
    itemsId: "",
    quantity: ""

  });

  const [newData, setNewData] = useState([]);

  const [items, setItems] = useState([])

  function handleChange(e) {

    setData({ ...data, [e.target.id]: e.target.value })
    // console.log(data);
  };


  function handleSubmit(e) {
    e.preventDefault()

    axios.post("http://localhost:8080/recipeItem/", data)
      .then((res) => {
        // console.log(res.data);
        loadData();
      })
    setData({
      quantity: ""
    })

  };

  function loadData() {
    axios.get("http://localhost:8080/recipeItem/")
      .then((res) => {
        // console.log("data came",res.data);
        const filterdata = res.data.filter((item) => item.recipeId.recipeId == id)
        console.log('filterdata', filterdata);
        setNewData(filterdata)

      })
    axios.get("http://localhost:8080/items/")
      .then((res) => {
        // console.log("re"+res.data);
        setItems(res.data)
      })

  };

  useEffect(() => {
    loadData();
    // console.log(newData);
  }, []);

  function handleDelete(e, id) {
    e.preventDefault();
    axios.delete("http://localhost:8080/recipeItem/" + id)
      .then((res) => {
        // console.log(res.data);
        loadData();
      })
  }


  function handleAdd(e) {
    e.preventDefault();
    axios.post("http://localhost:8080/recipeItem/", data)
      .then((res) => {
        // console.log(res.data);
        loadData();
      })
  }


  return (
    <>

      <div class="breadcrumbs">
        <div class="container">
          <div class="row">
            <div class="col">
              <p class="bread"><span> <Link to='/'><a>Home</a></Link></span> / <span>Recipe Items</span></p>
            </div>
          </div>
        </div>
      </div>



      <div className='bg-secondary text-white'>

        <div className='col-lg-5 mx-3'><br />

          <label className='text' style={{ fontSize: "20px" }} htmlFor=''>Items</label>
          <select class="form-select" onChange={(e) => handleChange(e)} value={data.itemsId} id='itemsId' className='form-select'>

            <option disabled="">Select Items</option>
            {
              items.map((eachData) => {
                // console.log(eachData);
                return (
                  <option key={eachData.itemsId} value={eachData.itemsId}>{eachData.name}</option>
                )
              })
            }
          </select>

        </div>

        <div className='col-lg-5 mx-3'><br />

          <label className='text' style={{ fontSize: "20px" }} htmlFor=''>Quantity</label>
          <input onChange={(e) => handleChange(e)} value={data.quantity} id='quantity' type='double' className='form-control' />
        </div>

        <div className='m-3 pb-3 px-3'>
          <button onClick={(e) => handleSubmit(e)} className='btn btn-primary'>Submit</button>
        </div>
      </div>


      <table class="table">
        <thead>
          <tr class="bg-secondary text-center">
            <th>Sr.No.</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            newData.map((eachData, i) => {
              return (
                <tr key={i} class="text-center">
                  <th scope='row'>{i + 1}</th>
                  <td>{eachData.itemsId.name}</td>
                  <td>{eachData.quantity}</td>
                  <td>
                    <button onClick={(e) => handleDelete(e, eachData.recipeItemId)} className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
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
