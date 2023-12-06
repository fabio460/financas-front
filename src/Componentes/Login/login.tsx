import { Button } from '@mui/material'
import React,{useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import "./login.css";
import { loginApi } from '../Api/usuarioApi'
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const n = useNavigate()
  const handleLogin = async()=>{
    setLoading(true)
    const res:any = await loginApi(email, senha)
    if (res.token) {
     localStorage.setItem("token",JSON.stringify(res?.token))
     n("/")
    }else{
      setError(true)
    }
    setLoading(false)
  }
  return (
    <div className='loginContainer'>
        <img className='imgLogin' alt='sem imagem' src='https://t4.ftcdn.net/jpg/04/28/75/97/360_F_428759715_jsOPITlaytE3QXc2yI1D4U6uwZdVGkRp.jpg'/>
        <div className='bodyLogin'>
            <input type='email' className='inputText' placeholder='E-Mail' onChange={e=>setEmail(e.target.value)}/>
            <input type='password' className='inputText' placeholder='Senha' onChange={e=>setSenha(e.target.value)}/>
            {
              error && <div style={{color:"#d32f2f"}}>Usuário ou senha inválidos</div>
            }
            <Button className='btnGlobal' onClick={handleLogin} sx={{mt:6,height:45}} variant='contained'>
               {
                 loading ? <CircularProgress size={30} sx={{color:"white"}}/>:<div>Entrar</div>
               }  
            </Button>
            <div style={{margin:"20px 0px", textAlign:"center"}}>Não é cadastrado? <span className='loginLinkCadastro' onClick={()=>n("/cadastro")}>clique aqui</span></div>
        </div>
    </div>
  )
}
