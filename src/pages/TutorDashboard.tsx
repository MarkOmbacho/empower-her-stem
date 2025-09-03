import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function TutorDashboard(){
  const [courses, setCourses] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('dashboardToken');

  // creation form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modules, setModules] = useState<any[]>([]);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleNotes, setModuleNotes] = useState('');

  useEffect(()=>{
    fetchCourses();
    if(token){
      api.get('/api/dashboard-auth/me', { headers: { Authorization: `Bearer ${token}` } }).then(res=>setProfile(res.data.user)).catch(()=>{});
    }
  },[]);

  const fetchCourses = async ()=>{
    try{
      const res = await api.get('/api/courses');
      setCourses(res.data);
    }catch(err){
      setCourses([]);
    }
  }

  const addModule = ()=>{
    if(!moduleTitle) return;
    const nextId = (modules.length||0)+1;
    setModules([...modules,{ id: nextId, title: moduleTitle, notes: moduleNotes }]);
    setModuleTitle(''); setModuleNotes('');
  }

  const handleCreate = async (e:any)=>{
    e.preventDefault();
    if(!title) return alert('Please add a title');
    try{
      const payload = { title, description, modules };
      await api.post('/api/courses', payload, { headers: { Authorization: `Bearer ${token}` } });
      setTitle(''); setDescription(''); setModules([]);
      fetchCourses();
      alert('Course created');
    }catch(err:any){
      alert(err?.response?.data?.message || 'Failed to create course');
    }
  }

  const handleDelete = async (id:string)=>{
    if(!confirm('Delete this course?')) return;
    await api.delete(`/api/courses/${id}`, { headers: { Authorization: `Bearer ${token}` }});
    setCourses(c=>c.filter(x=>x._id!==id));
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
          {profile && <div className="text-sm text-slate-600">{profile.name} • {profile.email} • Role: {profile.role}</div>}
        </div>
        <div className="flex gap-2">
          <Button onClick={()=>window.location.href='/'}>View Site</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Create a Course</h2>
          <form onSubmit={handleCreate}>
            <input className="w-full p-2 border mb-2" placeholder="Course title" value={title} onChange={e=>setTitle(e.target.value)} required />
            <textarea className="w-full p-2 border mb-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
            <div className="mb-2">
              <h3 className="font-medium">Modules</h3>
              <div className="flex gap-2 mt-2">
                <input className="flex-1 p-2 border" placeholder="Module title" value={moduleTitle} onChange={e=>setModuleTitle(e.target.value)} />
                <input className="flex-1 p-2 border" placeholder="Notes" value={moduleNotes} onChange={e=>setModuleNotes(e.target.value)} />
                <Button type="button" onClick={addModule}>Add</Button>
              </div>
              <ul className="mt-2">
                {modules.map(m=> <li key={m.id} className="text-sm">{m.title} — {m.notes}</li>)}
              </ul>
            </div>
            <Button type="submit">Create Course</Button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Your Courses</h2>
          <div className="grid gap-4">
            {courses.map(c=> (
              <div key={c._id} className="border rounded p-4 flex justify-between items-center bg-white">
                <div>
                  <div className="text-lg font-semibold">{c.title}</div>
                  <div className="text-sm text-slate-600">{c.tutor} • {c.category} • {c.modules?.length || 0} modules</div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={()=>navigate(`/tutor-editor/${c._id}`)}>Edit</Button>
                  <Button variant="destructive" onClick={()=>handleDelete(c._id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
