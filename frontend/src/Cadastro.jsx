import {useState} from 'react'
import { Link } from 'react-router-dom'

function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [message, setMessage] = useState('')
    async function handleCadastroSubmit(event){
        event.preventDefault()
        const dadosCadastro = {
            'nome': nome,
            'email': email,
            'senha': senha
        }
        const response = await fetch('http://localhost:5000/cadastro',{
            method: 'POST',
            body: JSON.stringify(dadosCadastro),
            headers: {
                'Content-Type': 'application/json'
            }
        
        })
        const result = await response.json()
        if (result['status'] == 'failed'){
            setMessage("Erro no cadastro. Tente novamente.")
        }
        if (result['status'] == 'success'){
            setMessage('Usuário cadastrado com sucesso!')
        }
    }  
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
        
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

            <div className="text-center mb-6">
            {message && <p>{message}</p>}
            <h1 className="font-bold text-3xl text-slate-800">
                Criar conta
            </h1>

            <p className="text-sm text-slate-500 mt-2">
                Crie sua conta para começar
            </p>
            </div>

            <form 
            cassName="space-y-4"
            onSubmit={handleCadastroSubmit}
            >

            <div>
                <label
                htmlFor="nome"
                className="block text-sm font-medium text-slate-700 mb-1"
                >
                Nome
                </label>

                <input
                id="nome"
                type="text"
                className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Seu nome"
                onChange={(event) =>{
                    setNome(event.target.value)
                }

                }
                />
            </div>

            <div>
                <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
                >
                E-mail
                </label>

                <input
                id="email"
                type="email"
                className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                placeholder="seu@email.com"
                onChange={(event) => {
                    setEmail(event.target.value)
                }}
                />
            </div>

            <div>
                <label
                htmlFor="senha"
                className="block text-sm font-medium text-slate-700 mb-1"
                >
                Senha
                </label>

                <input
                id="senha"
                type="password"
                className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Sua senha"
                onChange={(event) =>{
                    setSenha(event.target.value)
                }}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600"
            >
                Criar conta
            </button>

            </form>

            <p className="text-sm text-center text-slate-500 mt-6">
            Já possui uma conta?{' '}
            <Link 
                className="text-blue-500 font-medium cursor-pointer"
                to={'/login'}
            >
                Entrar
            </Link>
            </p>

        </div>

        </div>
    )
}

export default Cadastro