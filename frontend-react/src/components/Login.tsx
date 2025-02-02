import { Button, Grid, TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const resp = await fetch(`http://localhost:3000/users?username=${username}`, {
            method: 'GET',
        })        

        .then (resposta => {
            return resposta.json()
        })

        if (resp.length === 0) {
            Swal.fire({
                title: 'Erro',
                text: 'Usuário ou senha estão incorretos',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } else {
            if (resp[0].password !== password) {
                Swal.fire({
                    title: 'Erro',
                    text: 'Usuário ou senha estão incorretos',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            } else {
                Swal.fire({
                    title: 'Sucesso',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/produto', { state: { username: username } });
                    }
                });
            }
        }
    }

    return (
        <div>
            <Grid container style={{ minHeight: '100vh'}}>
                <Grid container item xs={12} sm={6} alignItems="center" direction="column" justifyContent="space-between" style={{padding: 10}}>
                    <div />
                        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300}}>
                        <div>
                        <h2 style={{color:"#000000", fontSize: 30, fontFamily:"Lucida Sans"}}>
                            Bem vindo!
                        </h2>
                        <h3 style={{color:"#000000", marginBottom:20, marginTop:5, fontFamily:"Verdana"}}>
                            Digite suas credenciais para acessar o site.
                        </h3>
                    </div>
                            <Grid container alignItems="center" direction="column">
                                <img
                                    src="padlock.png" 
                                    width={'8%'} 
                                    alt="logo"
                                />
                            </Grid>
                            <TextField label="Login" margin="normal" />
                            <TextField label="Senha" margin="normal" type="password" />
                            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300, marginTop: 15, boxShadow: '0px 2px 9px #6c63ff'}}>
                            <Button>
                                Entrar
                            </Button>
                        </div>
                        </div>
                    <div />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <img 
                        src="login.png" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover'}} 
                        alt="brand"
                    />
                </Grid>
            </Grid>
        </div>
    )
}