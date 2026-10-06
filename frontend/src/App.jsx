import { useState } from 'react'

function App() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [message, setMessage] = useState('')
  return(
    <div className='min-h-screen flex flex-col items-center justify-center bg-slate-100'>
      {message && <p>{message}</p>}
      <div className='bg-white rounded-2xl shadow-lg w-full max-w-md p-8 space-y-4'>
        <div className='space-y-2'>
          <h1 className='font-bold text-3xl text-center text-slate-800'>Login</h1>
          <p className='font-medium text-sm text-slate-500 text-center'> Entre na sua conta</p>
        </div>
        <form className='space-y-2' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium text-slate-800' htmlFor='email'>E-mail</label>
            <input 
              id='email'
              className='w-full border p-2 rounded-md border-slate-300 focus:ring-2 focus:ring-blue-400'
              type='email'
              value={email} 
              onChange={
                (event) => {
                  setEmail(event.target.value)
                  }
              } 
            />
          </div>
          <div>
            <label htmlFor='senha' className='block text-sm font-medium text-slate-700'>Senha</label>
            <input 
              id="senha"
              className='w-full border p-2 rounded-md border-slate-300 focus:ring-2 focus:ring-blue-400'
              type='password'
              value={senha}
              onChange={
                (event) => {
                  setSenha(event.target.value)
                }
              }
            />
          </div>
          <button className="bg-blue-500 text-white rounded-md p-2 w-full active:bg-blue-400">Entrar</button>
        </form>
      </div>
    </div>
  )

  async function handleSubmit(event){
    event.preventDefault()
    const dadosLogin = {
                  "email" : email,
                  "senha" : senha
                }
    const response = await fetch("http://localhost:5000/login_submit", {
      method: 'POST',
      body: JSON.stringify(dadosLogin),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result = await response.json()
    console.log(result)
    if (result['status'] == 'failed'){
      return setMessage("Falha no login")
    }
    else {  
      return setMessage("Logado com sucesso")
    }
  }
}
export default App


