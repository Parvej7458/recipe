import React from 'react'
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
    return (
        <div>
            <div>
                <div className="row">
                  
                    <div className="col-lg-2 bg-dark">
                        <div class="container-fluid">
                            <div class="row">
                                <div class=" px-lg-2 px-0 bg-dark">
                                    <div class="d-flex flex-column align-items-center align-items-xl-start px-3  text-white min-vh-100">
                                        <a class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none .text-warning">
                                            <p class="text-warning bg-dark">
                                                <span class="fs-5 d-none d-sm-inline"><i class="fa-solid fa-house me-2"></i>Menu</span></p>
                                        </a>
                                        <ul class="nav nav-pills flex-column mb-lg-2 mb-0 align-items-center align-items-lg-start" id="menu">
                                            <Link to={"/admin/sidebar"} class="nav-item">
                                                <a class="nav-link align-middle px-0">

                                                    <p class="ms-1 d-none d-lg-inline text-warning bg-dark"><i class="fa-solid fa-display me-2 "></i>Dashboard</p>
                                                </a>
                                            </Link>
                                            <Link to={"/admin/items"}>
                                                <a class="nav-link px-0 align-middle">
                                                    {/* <i class="fs-4 bi-table"></i>  */}
                                                    <span class="ms-1 d-none d-sm-inline  text-warning bg-dark"><i class="fa-solid fa-list-ul  me-2"></i>Items</span></a>
                                            </Link>
                                            <Link to={"/admin/units"}>
                                                <a class="nav-link px-0 align-middle">
                                                    {/* <i class="fs-4 bi-speedometer2"></i>  */}
                                                    <span class="ms-1 d-none d-lg-inline text-warning bg-dark"><i class="fa-solid fa-boxes-stacked me-2 text-warning bg-dark "></i>Units</span>
                                                </a>

                                            </Link>
                                            <Link to={"/admin/recipes"}>
                                                <a class="nav-link px-0 align-middle ">
                                                    <span class="ms-1 d-none d-sm-inline  text-warning bg-dark"><i class="fa-solid fa-utensils me-2"></i>Recipes</span></a>

                                            </Link>
                                            {/* <Link to={"/admin/recipeitems"}>
                                                <a class="nav-link px-0 align-middle">
                                                   
                                                    <span class="ms-1 d-none d-sm-inline  text-warning bg-dark"> <i class="fa-solid fa-plate-wheat me-2"></i>Recipe Items</span> </a>
                                            </Link>
                                             */}
                                            <Link to={"/admin/orders"}>
                                                <a class="nav-link px-0 align-middle">
                                                    <span class="ms-1 d-none d-sm-inline  text-warning bg-dark"><i class="fa-solid fa-bell-concierge  me-2"></i>Orders</span> </a>

                                            </Link>
                                            <Link to={"/admin/orderrecipe"}>
                                                <a class="nav-link px-0 align-middle">
                                                    <span class="ms-1 d-none d-sm-inline  text-warning bg-dark"><i class="fa-solid fa-bell-concierge  me-2"></i>OrderRecipe</span> </a>

                                            </Link>

                                            <Link to={"/logout"}>
                                                <a href="#" class="nav-link px-0 align-middle">
                                                    {/* <i class="fs-4 bi-people"></i>  */}
                                                    <span class="ms-1 d-none d-sm-inline  text-warning bg-dark"> <i class="fa-solid fa-user me-2"></i>LogOut</span> </a>
                                            </Link>
                                        </ul>


                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="col-lg-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard