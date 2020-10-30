import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import api from '../../services/api';
import "../Home/style.css";


export default function Home() {

  const[redirecTo, SetRedirectTo] = useState(false);
  const[value, setValue] = useState('');
  const[sentimentos, setSentimentos] = useState('');
  const[resposta, setResposta] = useState('');
  const[message, setMessage] = useState('');

 



  useEffect(() =>{

      async function Load(){

        
      const response = await api.get('/');
      console.log(response);
      const resp = response.data;
      console.log(resp);

      if(resp === 'false'){

        SetRedirectTo(true);
        
        

      }else{



        setValue(resp);

      }

    } 

    Load();
  }, []);




    async function  enviarAnalise(e) {

      e.preventDefault();

      try {

        const resp = await api.post('/api/query', 
          {

            word: sentimentos

          }
        
        );
        
       
        setResposta(resp.data);
        setMessage('Sentimento analisado com Sucesso');
    
        
      }catch (error) {
        
        console.log("Mensagem Não enviada", error);

      }

  }



  const logout = () =>{

      const nada = '';

      setValue(nada);

      SetRedirectTo(true);

  }



  if(!redirecTo){

    return (
      <div className="divLogado">


          <button className="btnDeslogar"  onClick={logout}>Logout</button>


            
          <h1>SINTA-SE A VONTADE</h1>

          <form className="formLogado" onSubmit={enviarAnalise}>

            <textarea className="textArea" name="mensagem"  placeholder="Escreva a primeira palavra que vem em sua mente!!!" onChange={(e) => setSentimentos(e.target.value)}></textarea>

            <button className="btnTextArea" type="submit">Analizar</button>

            {message && <span className="message">{message}</span>}

          </form>

          <div className="divBoxAnswer">
            { 
              (resposta === '' )  ? <p></p> : <h1><span>{`${resposta}`}</span></h1>

            } 
          </div>

        

      </div>

    );

  }else{

    return <Redirect to="/login"></Redirect>

  }
}

