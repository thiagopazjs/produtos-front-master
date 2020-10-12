import { http } from './config'

export default	{

	salvar:(cliente)=>{
		return http.post('cliente',cliente);
  },
    
	atualizar:(cliente)=>{
		return http.put('cliente',cliente);
  },

  listar:()=>{
		return http.get('clientes')
  },
    
	apagar:(cliente)=>{
		return http.delete('cliente', { data: cliente })
	}
}