import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Modal } from 'antd';
import Typography from '@mui/material/Typography';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './main.css';
//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';





const Dashboard = () => {
    const [dropdown, setdropdown] = useState('all_value');

    const [data, setData] = useState([]);
    const [updated, setupdated] = useState("");
    const [id, setid] = useState(null);



    const navigate = useNavigate()

    const getApi = async () => {

        await fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setData(json)
            )
    }

    useEffect(() => {
        getApi();
    }, [])

    //Pop up Implementation



    const [isModalOpen, setIsModalOpen] = useState(false);



    const showModal = (id) => {

        setid(id);
        setIsModalOpen(true);



    };
    const handleOk = () => {

        console.log("id", id);

        let inputvalue = parseFloat(updated)
        let res1 = data.map(res => res.id === id ? { ...res, price: inputvalue } : res)
        console.log("Edited", updated);
        if (updated) {
            setData(res1);
        }

        console.log("Edited", res1);
        setupdated("");
        toast.success("Product Price Updated Succefully")
        setIsModalOpen(false);



    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleproductdata = (id) => {
        navigate('/product', { state: id })

    }

    //handle delete

    const handledelete = (id) => {

        let result = data.filter((arr) => {
            return arr.id !== id;
        })
        setData(result);
        toast.success("Product deleted Succefully");


    }







    const handledropdown = (event) => {
        setdropdown(event.target.value);
    }



    return (
        <div>

            {/* Nav Bar Start */}

            {/* Nav Bar End */}



            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand>E Commerce 🛒</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >



                        </Nav>
                        <Form className="d-flex">
                            <select value={dropdown} onChange={handledropdown}

                            >
                                <option value="all_value">Select Category</option>
                                <option value="men's clothing">Mens Cloth</option>
                                <option value="jewelery">Jewelery</option>
                                <option value="electronics">Electronics</option>
                                <option value="women's clothing">Womens Clothing</option>
                            </select>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>



            <div className='main'>


                {

                    data.filter((arr) => { return dropdown === "all_value" ? arr : arr.category === dropdown }).map(
                        (data) => (

                            <div key={data.id} style={{ margin: '11px' }}>

                                <Card sx={{ maxWidth: 300 }}
                                    style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
                                >
                                    <CardMedia
                                        component="img"
                                        alt="Movie Image"
                                        sx={{ width: 285, height: 200, objectFit: 'fill' }}

                                        image={data.image}
                                    />
                                    <CardContent sx={{ height: 120, width: 250 }}>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                                            <span><strong>Product Name: </strong></span>
                                            <span>  {data.title}</span>
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            <span><strong>Price: </strong></span>
                                            <span>${data.price}</span>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>

                                        {/* <Button size="small" variant="contained"
                                    onClick={() => handleEdit(data.id)}
                                >✏️Edit</Button> */}
                                        {/* 
                                <Button size="small" variant="contained" onClick={() => handleClickOpen(data.id)}>
                                    ✏️Edit
                                </Button> */}
                                        <Button size="small" variant="contained" onClick={() => showModal(data.id)}>
                                            ✏️Edit
                                        </Button>
                                        <Modal title="Update Product Price" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                            <span><strong>Price: </strong> <input type='text' placeholder='Enter price' value={updated} onChange={(e) => setupdated(e.target.value)} /></span>

                                        </Modal>



                                        <Button size="small" variant="contained"
                                            onClick={() => handleproductdata(data.id)}


                                        >👁️View</Button>
                                        <Button size="small" variant="contained"
                                            onClick={() => handledelete(data.id)}

                                        >🗑️Delete</Button>
                                    </CardActions>
                                </Card>

                            </div>
                        ))

                }
                <ToastContainer />
            </div>


        </div>

    );
};
export default Dashboard;