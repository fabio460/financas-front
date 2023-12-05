import React,{useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { cadastroApi } from '../Api/usuarioApi';
import { emailValido, nomeValido, senhaValida } from '../../metodosUteis';

const imagem = 'https://img.freepik.com/vetores-gratis/cv-dos-funcionarios-curriculo-dos-candidatos-trabalhadores-corporativos-estudantes-id-isolam-elemento-de-design-plano-formularios-de-emprego-avatares-ilustracao-do-conceito-de-informacao-pessoal_335657-1661.jpg'
export default function Cadastro() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [nome, setNome] = useState("")
  const [error, setError] = useState(false)
  const [erroSenha, seterroSenha] = useState(false)
  const [erroEmail, seterroEmail] = useState(false)
  const [erroNome, seterroNome] = useState(false)
  const [loading, setLoading] = useState(false)
  const n = useNavigate()
  const handleLogin = async()=>{
    if (!emailValido(email)) {
      seterroEmail(true)
      return null
    }else{
      seterroEmail(false)
    }
    if (!nomeValido(nome)) {
      seterroNome(true)
      return null
    } else {
      seterroNome(false)
    }
    if (!senhaValida(senha)) {
      seterroSenha(true)
      return null
    } else {
      seterroSenha(false)      
    }
    
    setLoading(true)
    const res:any = await cadastroApi(email, senha, nome)
    if (res === "usuário criado com sucesso!") {
     n("/login")
    }else{
      setError(true)
    }
    setLoading(false)
  }
  return (
    <div className='loginContainer'>
    <img className='imgCadastro' src={imagem} alt='sem imagem'/>
    <div className='bodyLogin'>
        {erroEmail && <div style={{color:"#d32f2f"}}>Formato de email inválido</div>}
        <input type='email' className='inputText' placeholder='E-Mail' onChange={e=>setEmail(e.target.value)}/>
        {erroNome && <div style={{color:"#d32f2f"}}>O nome tem que ter pelo menos 3 letras</div>}
        <input type='text' className='inputText' placeholder='Nome' onChange={e=>setNome(e.target.value)}/>
        {erroSenha && <div style={{color:"#d32f2f"}}>A senha tem que ter no mínimo 5 caracteres letras e números</div>}
        <input type='password' className='inputText' placeholder='Senha' onChange={e=>setSenha(e.target.value)}/>
        {
          error && <div style={{color:"#d32f2f"}}>Falha ao cadastrar, este email já existe!</div>
        }
        <Button className='btnLogin' onClick={handleLogin} sx={{mt:4,height:45}} variant='contained'>
           {
             loading ? <CircularProgress size={30} sx={{color:"white"}}/>:<div>Cadastrar</div>
           }  
        </Button>
        <Button variant='outlined' onClick={()=>n("/login")} sx={{mt:2,height:45}}>Entrar</Button>
    </div>
</div>
  )
}
