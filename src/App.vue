/* eslint-disable no-console */
<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cadastro de Clientes Front</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>


      <form @click.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="cliente.nome" >
          <label>CPF</label>
          <input type="number" maxlength="11" placeholder="CPF" v-model="cliente.cpf" >
          <label>Data nascimento</label>
          <input type="date"  value="" v-model="cliente.datanascimento" >

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr class="tr">
            <th>NOME</th>
            <th>CPF</th>
            <th>DATA NASCIMENTO</th>
            
          </tr>

        </thead>

        <tbody>

          <tr v-for="cliente of clientes" :key="cliente.id">

            <td>{{ cliente.nome }}</td>
            <td>{{ cliente.cpf }}</td>
            <td>{{ cliente.datanascimento }}</td>
            <td>
              <button @click="editar(cliente)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(cliente)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import cliente from './services/cliente'


export default {
  name: 'app',
  data () {
    return {
      cliente:{
        id: '',
        nome: '',
        cpf: '',
        datanascimento: ''
      },
      clientes: [],
      errors: []
    }
  },

  mounted(){
    this.listar()
  },

  methods:{
    
    listar(){
      cliente.listar().then(resposta => {
        this.clientes = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    salvar(){

      if(!this.cliente.id){

        cliente.salvar(this.cliente).then(resposta => {
          this.cliente = {}
          alert('Cadastrado com sucesso!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }else{

        cliente.atualizar(this.cliente).then(resposta => {
          this.cliente = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }
      

    },

    editar(cliente){
      this.cliente = cliente
    },

    remover(cliente){

      if(confirm('Deseja excluir o cliente?')){

        cliente.apagar(cliente).then(resposta => {
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }

    }
  }

}
</script>

<style>

.container {
  background-color:rgba(240, 255, 255, 0.747);
  width: 600px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.waves-effect{
  background-color: rgb(32, 228, 117);
  border-radius: 25px;
  text-align: center;
  align-items: center;
  box-shadow: seashell;
  margin-top: 10px;
}

.tr{
  align-items: center;
  color: darkslategrey;
  justify-content: space-between;
}

</style>
