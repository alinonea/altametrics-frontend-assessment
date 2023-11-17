import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardContent, Typography } from "@mui/material";
import InvoiceModal from "./InvoiceModal";

const Login = (props: any) => {
    const [error, setError] = useState("")
    const [invoices, setInvoices] = useState([])
    const [modalInvoice, setModalInvoice] = useState(0)
    
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') || '{}')

    const getInvoices = () => {
        
        axios.get("http://localhost:3000/invoices", {
            headers: {
            'Authorization': 'Bearer ' + user.token
        }})
        .then(r => {
            if (r.status === 200) {
                setInvoices(r.data)
            }
            setError('')
        }).catch(err => {
            if(err.response.status === 401){
                props.setLoggedIn(false);
                navigate('/login')
            }
            setError('Something went wrong.')
        })
    }

    const getInvoice = (invoiceId: number) => {
        axios.get(`http://localhost:3000/invoices/${invoiceId}`, {
            headers: {
            'Authorization': 'Bearer ' + user.token
        }})
        .then(r => {
            console.log(r)
            if (r.status === 200) {
                setModalInvoice(r.data)
            }
        }).catch(err => {
            if(err.response.status === 401){
                props.setLoggedIn(false);
                navigate('/login')
            }
        })
    }
        
    useEffect(() => {
       getInvoices();
      }, [])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => { setOpen(true)}
    const handleClose = () => setOpen(false);

    return(
    <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Hello, {user.user_name}</div>
        </div>
        <Grid container>
            {
                invoices.map(invoice => {
                    return (
                        <Card key={invoice['id']} sx={{ minWidth: 275 }} style={{margin: '5px'}} onClick={() =>{
                            getInvoice(invoice['id'])
                            handleOpen()
                        }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                Amount
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} gutterBottom>
                                {
                                    invoice['amount']
                                }
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </Grid>
        <br />
        {
           error ?  <h1 style={{color: 'red', fontSize: '12px'}}>{error}</h1> : '' 
        }
       <InvoiceModal open={open} handleClose={handleClose} invoice={modalInvoice}/>
    </div>)
}

export default Login