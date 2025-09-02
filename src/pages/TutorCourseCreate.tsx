import { useState } from 'react';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function TutorCourseCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modules, setModules] = useState<any[]>([]);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleNotes, setModuleNotes] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('dashboardToken');

  const addModule = () => {
    if (!moduleTitle) return;
    setModules([...modules, { title: moduleTitle, notes: moduleNotes }]);
    setModuleTitle('');
    setModuleNotes('');
  };

  const handleCreate = async (e:any) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/courses', { title, description, modules }, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/tutor-courses');
    } catch (err:any) {
      alert(err.response?.data?.error || 'Failed to create course');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Create Course</h2>
      <form onSubmit={handleCreate} className="max-w-md">
        <input className="w-full mb-2 p-2 border" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <textarea className="w-full mb-2 p-2 border" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <div className="mb-4">
          <h3 className="font-semibold">Modules</h3>
          <div className="flex gap-2">
            <input className="flex-1 p-2 border" placeholder="Module title" value={moduleTitle} onChange={e=>setModuleTitle(e.target.value)} />
            <input className="flex-1 p-2 border" placeholder="Notes (optional)" value={moduleNotes} onChange={e=>setModuleNotes(e.target.value)} />
            <Button type="button" onClick={addModule}>Add</Button>
          </div>
          <ul className="mt-2">
            {modules.map((m,i)=> <li key={i} className="border p-2 my-1">{m.title} - {m.notes}</li>)}
          </ul>
        </div>
        <Button type="submit">Create Course</Button>
      </form>
    </div>
  );
}
