import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function TutorCourses(){
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(()=>{
    api.get('/api/courses').then(res=>setCourses(res.data)).catch(()=>setCourses([]));
  },[]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Courses</h2>
        <Link to="/tutor-create"><Button>Create Course</Button></Link>
      </div>
      <div className="grid gap-4">
        {courses.map(c=> (
          <div key={c._id} className="border p-4 rounded">
            <h3 className="font-semibold">{c.title}</h3>
            <div className="text-sm text-slate-600">{c.description}</div>
            <div className="mt-2 text-sm">Modules: {c.modules?.length || 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
