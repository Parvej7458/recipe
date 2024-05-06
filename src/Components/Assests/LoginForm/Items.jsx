import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function Items() {

  const [unit, setUnit] = useState([])

  const [data, setData] = useState({
    name: "",
    unitsId: "",
    rate: ""
  });

  const [newData, setNewData] = useState([]);
  const [id, setId] = useState(undefined);

  function handleChange(e) {

    setData({ ...data, [e.target.id]: e.target.value })
    // console.log(data);
  };


  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    if (id === undefined) {
      axios.post("http://localhost:8080/items/", data)
        .then((res) => {
          console.log(res.data);
          loadData();
        })
      setData({
        name: "",
        units: "",
        rate: ""
      })

    } else {
      axios.put("http://localhost:8080/items/" + id, data)
        .then((res) => {
          console.log(res.data);
          loadData();
          setId(undefined)
        })
      setData({
        name: "",
        units: "",
        rate: ""
      })

    }


  };



  // useEffect(() => {

  //   if (id !== undefined) {
  //     axios.get("http://localhost:8080/items/" + id)
  //       .then((res) => {
  //         console.log("res" + res.data);
  //         setData({
  //           name: res.data.name,
  //           units: res.data.units.name,
  //           rate: res.data.rate
  //         })
  //       })
  //   }
  // }, [])


  function loadData() {
    axios.get("http://localhost:8080/items/")
      .then((res) => {
        console.log(res.data);
        setNewData(res.data)
      })
    axios.get("http://localhost:8080/units/")
      .then((res) => {
        console.log(res.data);
        setUnit(res.data)
      })
  };

  useEffect(() => {
    loadData();
    // console.log(newData);
  }, []);

  function handleDelete(e, id) {
    e.preventDefault();
    axios.delete("http://localhost:8080/items/" + id)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
  }

  function handleUpdate(e, id) {
    e.preventDefault()
    setId(id)
    axios.get("http://localhost:8080/items/" + id)
      .then((res) => {
        console.log("res" + res.data);
        setData({
          name: res.data.name,
          units: res.data.units.name,
          rate: res.data.rate
        })
      })
  }



  return (
    <>

      <div class="breadcrumbs">
        <div class="container">
          <div class="row">
            <div class="col">
              <p class="bread"><span> <Link to='/'><a>Home</a></Link></span> / <span>Items</span></p>
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

          <label className='text' style={{ fontSize: "20px" }} htmlFor='Units'>Units</label>

          <select class="form-select" onChange={(e) => handleChange(e)} value={data.unitsId} id="unitsId" className="form-select">


            <option disabled="">Select a Unit</option>
            {
              unit.map((eachData) => {
                // console.log(eachData);
                return (
                  <option key={eachData.id} value={eachData.unitsId}>{eachData.name}</option>
                )
              })
            }
          </select>

        </div>

        <div className="row m-3">
          <div className="col-lg-4">
            <label className='text' style={{ fontSize: "20px" }} htmlFor="">Rate</label>
            <input onChange={(e) => handleChange(e)} value={data.rate} id='rate' type='double' className='form-control' />
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
            <th>Unit</th>
            <th>Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            newData.map((eachData, i) => {
              return (
                <tr key={i} class='text-center'>
                  <th scope='row'>{i + 1}</th>
                  <td>{eachData.name}</td>
                  <td>{eachData.units.name}</td>
                  <td>{eachData.rate}</td>

                  <td>
                    <button onClick={(e) => handleUpdate(e, eachData.itemsId)} className='btn btn-primary me-1'><i class="fa-solid fa-pencil"></i></button>
                    <button onClick={(e) => handleDelete(e, eachData.itemsId)} className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
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
