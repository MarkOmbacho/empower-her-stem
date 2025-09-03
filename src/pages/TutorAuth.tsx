import { useState } from 'react';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function TutorAuth(){
  const [mode, setMode] = useState<'login'|'register'>('login');
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();

  const doLogin = async (e:any)=>{
    e.preventDefault();
    try{
      const res = await api.post('/api/dashboard-auth/login',{ username, password });
      localStorage.setItem('dashboardToken', res.data.token);
      navigate('/tutor-dashboard');
    }catch(err:any){
      alert(err.response?.data?.error || 'Login failed');
    }
  }

  const doRegister = async (e:any)=>{
    e.preventDefault();
    try{
      await api.post('/api/dashboard-auth/register',{ username, email, name, password, role: 'tutor' });
      alert('Registered — please login');
      setMode('login');
    }catch(err:any){
      alert(err.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
        <div className="flex gap-4 mb-6">
          <button className={`px-4 py-2 rounded ${mode==='login' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`} onClick={()=>setMode('login')}>Login</button>
          <button className={`px-4 py-2 rounded ${mode==='register' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`} onClick={()=>setMode('register')}>Register</button>
        </div>

        {mode==='login' ? (
          <form onSubmit={doLogin} className="grid gap-3">
            <input className="p-3 border rounded" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
            <input className="p-3 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            <Button type="submit">Login</Button>
          </form>
        ) : (
          <form onSubmit={doRegister} className="grid gap-3">
            <input className="p-3 border rounded" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
            <input className="p-3 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input className="p-3 border rounded" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
            <input className="p-3 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            <Button type="submit">Register</Button>
          </form>
        )}
      </div>
    </div>
  );
}
