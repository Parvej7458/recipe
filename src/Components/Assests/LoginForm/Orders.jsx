
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Orders() {

  const [data, setData] = useState({
    orderdate: "",
    customername: "",
    mobilenumber: "",
    eventdate: "",
    address: "",
    status: "",
    quantity: ""
  })

  const [newData, setNewData] = useState([]);
  const [recipe, setRecipe] = useState([]);

  const [checkId, setCheckId]=useState([]);

  function handleChange(e) {
    console.log(e.target.value);
    // setData({ ...data, [e.target.id]: e.target.value })
    // console.log(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);

    axios.post("http://localhost:8080/orders/", data)
      .then((res) => {
        console.log(res.data);
      })

  }
  function loadData() {
    axios.get("http://localhost:8080/recipes/")
      .then((res) => {
        setRecipe(res.data);
        console.log(recipe);
      })
  }
function handleCheck(e,id){
let selectedRecipeId=[];

selectedRecipeId.push(id)

  e.preventDefault();
  axios.get("http://localhost:8080/orders/orderstotal"+selectedRecipeId)
  .then((res)=>{
    console.log(res.data);
  })
}

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div class="mt-5">

        <div className="card mt-5">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-4 mb-3">
                <div>
                  <label for="date" class="form-label text-dark">Order Date</label>
                  <input type="date" onChange={(e) => { handleChange(e) }} class="form-control" id="orderdate" />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div>
                  <label for="name" class="form-label text-dark">Customer Name</label>
                  <input type='text' onChange={(e) => { handleChange(e) }} class="form-control" id="customername" />
                </div>

              </div>
              <div className="col-lg-4 mb-3">
                <div>
                  <label for="number" class="form-label text-dark">Mobile Number</label>
                  <input type='text' onChange={(e) => { handleChange(e) }} class="form-control" id="mobilenumber" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 mb-3">
                <div>
                  <label for="date" class="form-label text-dark">Event Date</label>
                  <input type="date" onChange={(e) => { handleChange(e) }} class="form-control" id="eventdate" />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div>
                  <label for="name" class="form-label text-dark">Address</label>
                  <input type='text' onChange={(e) => { handleChange(e) }} class="form-control" id="address" />
                </div>

              </div>
              {/* <div className="col-lg-4  mb-3">
        <div>
          <label for="number" class="form-label text-dark">Quantity:</label>
          <input type='text' class="form-control" id="number" value=""  />
        </div>

        <div>
          <label for="number" class="form-label text-dark">Status:</label>
          <input type='text' class="form-control" id="number" value=""  />
        </div>
      </div> */}
              <div class="form-group col-lg-2">

                <label for="inputState">Status</label>
                <select id="status" onChange={(e) => { handleChange(e) }} class="form-control"   >
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>

              <div class="form-group col-lg-2">
                <label for="number">Quantity</label>
                <input type="text" onChange={(e) => { handleChange(e) }} class="form-control" id="quantity" />
              </div>

            </div>
            <div>

            </div>

          </div>
        </div>

        <div>
          <div className="card mt-1">
            <div className="card-body">
              <div>
                <table class="table table-striped"style={{textAlign:"center"}}>

                  <thead>
                    <tr>
                      <th scope="col">Sr.No.</th>
                      <th scope="col">Check</th>
                      <th scope="col">Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Description</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      recipe.map((eachdata,i) => {
                        return(
                          <tr>

                          <td>{i+1}</td>
                          
                          <td>
                            <div class="form-check align-center ">
                              <input class="form-check-input " onClick={(e)=>{handleCheck(e,eachdata.id)}} type="checkbox" id="gridCheck" />
                            </div>
                          </td>
                          <td>{eachdata.name} </td>
                          <td>{eachdata.quantity}</td>
                          <td>{eachdata.description}</td>
                        </tr>
                        )
                       
                      })
                    }

                  </tbody>
                </table>
                <hr />

              </div>

              <div>
                <div className="row">
                  <div className="col-lg-10">

                  </div>

                </div>
              </div>

            </div>
          </div>

          <div class="card mt-3">

            <div class="card-body">
              <div class="row g-3">

                <div class="col-sm">
                  <label htmlFor="disabledSelect" className="form-label text-dark"> Amount</label>
                  <input type="number" id='amount' class="form-control" aria-label="State" />
                </div>

                <div class="col-sm-7">
                  <label htmlFor="disabledSelect" className="form-label text-dark">Bill Amount
                  </label>
                  <select id="itemId" className="form-select">
                    <option>Choose Items</option>
                  </select>
                </div>

              </div>
              <button type="button" onClick={(e) => { handleSubmit(e) }} className="btn btn-success ms-2 mt-4"  >Submit</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}





// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'


// export default function Orders() {

//     const [recipes, setRecipes] = useState([])

//     const [checkedItems, setCheckedItems] = useState({});

//     const handleCheckboxChange = (id) => {
//         setCheckedItems((prevCheckedItems) => ({
//             ...prevCheckedItems,
//             [id]: !prevCheckedItems[id],
//         }));
//     };

//     const [data, setData] = useState({

//         orderDate: "",
//         eventDate: "",
//         mobileNumber: "",
//         address: "",
//         quantity: "",
//         status: "",
//         amount: "",
//         billAmount: ""
//     });

//     const [newData, setNewData] = useState([]);
//     const [id, setId] = useState(undefined);

//     function handleChange(e) {

//         setData({ ...data, [e.target.id]: e.target.value })
//         // console.log(data);
//     };


//     function handleSubmit(e) {
//         e.preventDefault();

//         if (id === undefined) {
//             axios.post("http://localhost:8080/orders/", data)
//                 .then((res) => {
//                     // console.log(res.data);
//                     loadData();
//                 })
//             setData({

//                 orderDate: "",
//                 eventDate: "",
//                 mobileNumber: "",
//                 address: "",
//                 quantity: "",
//                 status: "",
//                 amount: "",
//                 billAmount: ""
//             })

//         } else {
//             axios.put("http://localhost:8080/orders/" + id, data)
//                 .then((res) => {
//                     // console.log(res.data);
//                     loadData();
//                     setId(undefined)
//                 })
//             setData({

//                 orderDate: "",
//                 eventDate: "",
//                 mobileNumber: "",
//                 address: "",
//                 quantity: "",
//                 status: "",
//                 amount: "",
//                 billAmount: ""
//             })

//         }


//     };



//     function loadData() {
//         axios.get("http://localhost:8080/orders/")
//             .then((res) => {
//                 // console.log(res.data);
//                 setNewData(res.data)
//             })

//         axios.get("http://localhost:8080/recipes/")
//             .then((res) => {
//                 console.log(res.data);
//                 setRecipes(res.data)
//             })
//     };

//     useEffect(() => {
//         loadData();
//         // console.log(newData);
//     }, []);

//     function handleDelete(e, id) {
//         e.preventDefault();
//         axios.delete("http://localhost:8080/orders/" + id)
//             .then((res) => {
//                 // console.log(res.data);
//                 loadData();
//             })
//     }

//     function handleUpdate(e, id) {
//         e.preventDefault();
//         setId(id)
//         axios.get("http://localhost:8080/orders/" + id)
//             .then((res) => {
//                 // console.log(res.data);
//                 setData({
//                     orderDate: res.data.orderDate,
//                     eventDate: res.data.eventDate,
//                     mobileNumber: res.data.mobileNumber,
//                     address: res.data.address,
//                     quantity: res.data.quantity,
//                     status: res.data.status,
//                     amount: res.data.amount,
//                     billAmount: res.data.billAmount
//                 })
//             })
//     }

//     return (
//         <>

//             <div class="breadcrumbs">
//                 <div class="container">
//                     <div class="row">
//                         <div class="col">
//                             <p class="bread"><span> <Link to='/'><a>Home</a></Link></span> / <span>Orders</span></p>
//                         </div>
//                     </div>
//                 </div>
//             </div>



//             <div className='text-black'>
//                 <div className="row m-3 ">

//                     <div className="col-lg-4">
//                         <br />
//                         <label className='text' style={{ fontSize: "20px" }} htmlFor="">Order Date</label>
//                         <input onChange={(e) => handleChange(e)} value={data.orderDate} id='orderDate' type='date' className='form-control' />
//                     </div>

//                     <div className='col-lg-4'><br />

//                         <label className='text' style={{ fontSize: "20px" }} htmlFor=''>Event Date</label>

//                         <input onChange={(e) => handleChange(e)} value={data.eventDate} id='eventDate' type='date' className='form-control' />
//                     </div>
//                     <div className="col-lg-4"><br />
//                         <label className='text' style={{ fontSize: "20px" }} htmlFor="">Mobile Number</label>
//                         <input onChange={(e) => handleChange(e)} value={data.mobileNumber} id='mobileNumber' type='text' className='form-control' />
//                     </div>


//                 </div>

//                 <div className="row m-3">
//                     <div className="col-lg-4"><br />
//                         <label className='text' style={{ fontSize: "20px" }} htmlFor="">Address</label>
//                         <input onChange={(e) => handleChange(e)} value={data.address} id='address' type='text' className='form-control' />
//                     </div>

//                     <div className="col-lg-4"><br />
//                         <label className='text' style={{ fontSize: "20px" }} htmlFor="">Quantity</label>
//                         <input onChange={(e) => handleChange(e)} value={data.quantity} id='quantity' type='double' className='form-control' />
//                     </div>

//                     <div className="col-lg-4"><br />
//                         <label className='text' style={{ fontSize: "20px" }} htmlFor="">Status</label>
//                         <input onChange={(e) => handleChange(e)} value={data.status} id='status' type='text' className='form-control' />
//                     </div>
//                 </div><br />

//                 <table class="table">
//                     <thead>
//                         <tr class="bg-secondary text-center">
//                             <th>Sr.No.</th>
//                             <th>Check Action</th>
//                             <th>Recipes</th>
//                             <th>Amount</th>
//                             <th>Bill Amount</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             newData.map((eachData, i) => {
//                                 return (
//                                     <tr key={i} class="bg-white text-center">
//                                         <th scope='row'>{i + 1}</th>
//                                         <td>
//                                             <input type="checkbox"
//                                                 // checked={checkedItems[eachData.recipesId] || false}
//                                                 // onChange={() => handleCheckboxChange(eachData.recipesId)}
//                                             />
//                                         </td>
                                        
//                                             {
//                                                  recipes.map((eachData) => {
//                                                     console.log(eachData);
//                                                    return (
//                                                         <td value={eachData.recipeId}>{eachData.name}</td>
//                                                      )
//                                                  })
//                                             }
//                                             {/* {eachData.name} */}
                                            
//                                         <td></td>
//                                         <td></td>

//                                     </tr>
//                                 )
//                             })
//                         }
//                     </tbody>
//                 </table>

//                 <div className='row m-3'>
//                     <div className="col-lg-3"><br />
//                         <label className='text' style={{ fontSize: "20px" }} htmlFor="">Amount</label>
//                         <input onChange={(e) => handleChange(e)} value={data.amount} id='amount' type='double' className='form-control' />
//                     </div>


//                     <div className="col-lg-3"><br />
//                         <label className='text' style={{ fontSize: "20px" }} htmlFor="">Bill Amount</label>
//                         <input onChange={(e) => handleChange(e)} value={data.billAmount} id='billAmount' type='double' className='form-control' />
//                     </div>

//                 </div>

//                 <br />
//                 <div className='m-3 pb-3 px-3'>
//                     <button onClick={(e) => handleSubmit(e)} className='btn btn-primary'>Submit</button>
//                 </div>

//             </div><br />





//             <table class="table">
//                 <thead>
//                     <tr class="bg-secondary text-center">
//                         <th>Sr.No.</th>
//                         <th>Order Date</th>
//                         <th>Event Date</th>
//                         <th>Mobile Number</th>
//                         <th>Address</th>
//                         <th>Quantity</th>
//                         <th>Status</th>
//                         <th>Amount</th>
//                         <th>Bill Amount</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         newData.map((eachData, i) => {
//                             return (
//                                 <tr key={i} class="text-center">
//                                     <th scope='row'>{i + 1}</th>
//                                     <td>{eachData.orderDate}</td>
//                                     <td>{eachData.eventDate}</td>
//                                     <td>{eachData.mobileNumber}</td>
//                                     <td>{eachData.address}</td>
//                                     <td>{eachData.quantity}</td>
//                                     <td>{eachData.status}</td>
//                                     <td>{eachData.amount}</td>
//                                     <td>{eachData.billAmount}</td>

//                                     <td>
//                                         {/* <Link to={"/admin/" + eachData.id}>
//                                             <button className='btn btn-primary me-1'><i class="fa-solid fa-pencil"></i></button>
//                                         </Link> */}
//                                         <button onClick={(e) => handleUpdate(e, eachData.orderId)} className='btn btn-primary me-1'><i class="fa-solid fa-pencil"></i></button>
//                                         <button onClick={(e) => handleDelete(e, eachData.orderId)} className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
//                                     </td>

//                                 </tr>
//                             )
//                         })
//                     }




//                 </tbody>
//             </table>
//         </>
//     )
// }
