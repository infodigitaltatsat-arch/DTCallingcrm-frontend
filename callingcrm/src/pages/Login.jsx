import { useNavigate, } from 'react-router-dom'
import { useState } from 'react'
import api from '../services/api'


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            })

            const { token } = response.data;


            if (!token) {
                throw new Error("Login response did not contain a token.")
            }

            localStorage.setItem("crm_token", token);
            navigate('/')


        } catch (error) {
            setError(error.response?.data?.message || error.message || "Login failed. Please try again");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <main className='flex min-h-screen items-center justify-center bg-blue-50 p-4'>

            {/* form */}
            <form className='w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-sm' onSubmit={handleLogin}>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className=' text-2xl font-bold text-blue-950'>
                        Digital Tatsat CRM
                    </h1>
                    <p className='mt-2 text-sm text-slate-500'>
                        Sign in to access your dashboard
                    </p>
                </div>

                {error && (
                    <p role='alert'
                        className='text-sm text-red-600'>
                        {error}
                    </p>
                )}
                <label className='block text-sm font-medium text-slate-700'>
                    Email
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className='mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5'
                    />
                </label>

                <label className='block text-sm font-medium text-slate-700'>
                    Password
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className='mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5'
                    />
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-700 cursor-pointer px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60">
                    {loading ? "Signing in..." : "Sign in"}
                </button>
            </form>
        </main>
    )

};

export default Login