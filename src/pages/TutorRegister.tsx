import { useState } from 'react';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function TutorRegister(){
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole]=useState('tutor');
  const navigate=useNavigate();

  const handle = async (e:any)=>{
    e.preventDefault();
    try{
      await api.post('/api/dashboard-auth/register',{ username, email, name, password, role });
      alert('Registered. Please login.');
      navigate('/dashboard-login');
    }catch(err:any){
      alert(err.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handle} className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Register as Tutor</h2>
        <input className="w-full p-2 border mb-2" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
        <input className="w-full p-2 border mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 border mb-2" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full p-2 border mb-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <div className="mb-4">
          <label className="mr-2"><input type="radio" checked={role==='tutor'} onChange={()=>setRole('tutor')} /> Tutor</label>
          <label className="ml-4"><input type="radio" checked={role==='admin'} onChange={()=>setRole('admin')} /> Admin</label>
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
