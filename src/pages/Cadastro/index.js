import React, {useState} from 'react';
import api from '../../services/api';
import '../Cadastro/style.css';



export default function Cadastro() {


    const[datas, setDatas] = useState({}); 
    const[error, setError] = useState([]);
    const[success, setSuccess]= useState('');


    const handlechange = (e) =>{


        const auxData = {...datas};
        auxData[e.target.name] = e.target.value;
        setDatas(auxData);
        

    }
 

    const handleSubmit = async (e) =>{

        e.preventDefault();
    

        try {


            if(datas.first_Name.length === "" || datas.last_name === "" || datas.email === "" || datas.password === ""){

                setError("Campos Vazios Não São Permitidos")
                return                    
                    

            }


            if(datas.first_Name.length === undefined || datas.last_name === undefined || datas.email === undefined || datas.password === undefined){

                setError("Campos Vazios Não São Permitidos")
                return                    
                    

            }

            if(datas.first_Name.length < 3 || datas.last_name.length < 3 || datas.email.length < 3 || datas.password.length < 3){
                setError("Existem campos com valores inferiores há 3 Caracteres")
                return    

            }


            await api.post('/api/register', datas ).then( resp => {

                if(resp.data === -1){

                    setError('Email já Cadastrado');
                    return

                }

                setError('');
                setSuccess("Cadastro Realizado com Sucesso!!");

                setTimeout(function(){
    
                    window.location = 'https://projfinal-frontend.herokuapp.com/#/login';
                
                
                },3000);
               

            });
            
        
                
        } catch (error) {
            setError("Erro ao Enviar, Valores Invalidos")
            return
        }



    };




  







        
    




    return (
    <div className="divCadastro">

        <div className="boxComponent">

            <form className="formName" onSubmit={handleSubmit}>
                
                <p>First Name:</p>
                <input onChange={handlechange} type="text" name="first_Name" placeholder="Name"></input>
                <p>Last Name</p>
                <input onChange={handlechange} type="text" name="last_name" placeholder="Last Name"></input> 
                <p>E-mail:</p>
                <input onChange={handlechange} type="text" name="email" placeholder="E-mail"></input>
                <p>Password:</p>
                <input onChange={handlechange} type="password" name="password" placeholder="Password"></input>
                <button className="btnCadastrar" type="submit">Cadastrar</button>
                {error && <span className="errorStyle">{error}</span>}  
                {success && <span className="sucStyle">{success}</span>}
            </form> 
            

        </div>

        
        
    </div>
  );
}

