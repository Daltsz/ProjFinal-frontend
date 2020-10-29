import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import api from '../../services/api';
import "../Login/style.css";



export default function Login() {

    const[value, setValue] = useState('');
    const[error, setError ] = useState([]);
    const[success, setSuccess]= useState([]);
    const[datas, setDatas] = useState({}); 


    const handlechange = (e) =>{


        const auxData = {...datas};
        auxData[e.target.name] = e.target.value;
        setDatas(auxData);
    } 
    
     
    const entrar = (e) =>{

    e.preventDefault();

    login();

    }


    

  const login = async () =>{
    
    try {


      if(datas.email === undefined || datas.password === undefined){

        setError("Campos Vazios Não São Permitidos")
        return

      }


      if(datas.email === "" || datas.password === ""){

          setError("Campos Vazios Não São Permitidos")
          return

        }

        await api.post('/api/login', datas).then( resp => {

            if(resp.data === -1){

              setError('Login ou senha Invalidos');
              return

            }

            setError('');
          
    
           
            
            setValue(resp.data);

            setTimeout(function(){

                setSuccess("Seja Bem-Vindo! Login Realizado com Sucesso!!")
            
            }, 2000);

        });
              
      } catch (error) {
          setError("Login ou Senha Invalidos", );
          return
      }
 
  }


    if(value){

        return <Redirect to="/"></Redirect>

    }else{

        return(

            
            <div className="divDeslogado">
            
            <div className="boxComponents">

                    <form onSubmit={entrar}>

                    <p>E-mail</p>
                    <input onChange={handlechange} type="email" name="email" placeholder="E-mail"></input>
                    <p>Password</p>
                    <input onChange={handlechange} type="password" name="password" placeholder="Password"></input>

                    <button className="btnLogin" type="submit" >Entrar!</button>          
                    <Link className="Link" to="/cadastro">Cadastre-se</Link>
                    {error && <span className="errorStyle2">{error}</span>}
                    {success && <span className="sucStyleLogin">{success}</span>}
                    
                    </form>
                </div> 

            </div>

        );
    }
}