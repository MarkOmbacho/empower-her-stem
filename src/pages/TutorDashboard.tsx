import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function TutorDashboard(){
  const [courses, setCourses] = useState<any[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('dashboardToken');

  useEffect(()=>{
    api.get('/api/courses').then(res=>setCourses(res.data)).catch(()=>setCourses([]));
  },[]);

  const handleDelete = async (id:string)=>{
    if(!confirm('Delete this course?')) return;
    await api.delete(`/api/courses/${id}`, { headers: { Authorization: `Bearer ${token}` }});
    setCourses(c=>c.filter(x=>x._id!==id));
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={()=>navigate('/tutor-create')}>Create Course</Button>
          <Button onClick={()=>window.location.href='/'}>View Site</Button>
        </div>
      </div>
      <div className="grid gap-4">
        {courses.map(c=> (
          <div key={c._id} className="border rounded p-4 flex justify-between items-center">
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
  );
}
