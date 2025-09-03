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
  const [moduleContent, setModuleContent] = useState('');
  const [moduleResources, setModuleResources] = useState('');
  const [moduleCertificate, setModuleCertificate] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('dashboardToken');

  const addModule = () => {
    if (!moduleTitle) return;
      const nextId = (modules.length || 0) + 1;
  setModules([...modules, { id: nextId, title: moduleTitle, notes: moduleNotes, content: moduleContent, resources: moduleResources ? moduleResources.split(',').map(s=>s.trim()) : [], certificate: moduleCertificate }]);
    setModuleTitle('');
    setModuleNotes('');
  setModuleContent('');
  setModuleResources('');
  setModuleCertificate(false);
  };

  const handleCreate = async (e:any) => {
    e.preventDefault();
    try {
        const payload = { title, description, modules };
        const res = await api.post('/api/courses', payload, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/tutor-courses');
    } catch (err:any) {
      alert(err.response?.data?.error || 'Failed to create course');
        alert(err?.response?.data?.message || 'Failed to create course');
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
          <div className="grid gap-2">
            <input className="p-2 border" placeholder="Module title" value={moduleTitle} onChange={e=>setModuleTitle(e.target.value)} />
            <textarea className="p-2 border" placeholder="Notes (optional)" value={moduleNotes} onChange={e=>setModuleNotes(e.target.value)} />
            <textarea className="p-2 border" placeholder="Content (markdown or HTML)" value={moduleContent} onChange={e=>setModuleContent(e.target.value)} />
            <input className="p-2 border" placeholder="Resources (comma separated URLs)" value={moduleResources} onChange={e=>setModuleResources(e.target.value)} />
            <label className="flex items-center gap-2"><input type="checkbox" checked={moduleCertificate} onChange={e=>setModuleCertificate(e.target.checked)} /> Issue Certificate for this module</label>
            <div className="flex gap-2">
              <Button type="button" onClick={addModule}>Add Module</Button>
            </div>
          </div>
          <ul className="mt-2">
            {modules.map((m,i)=> <li key={i} className="border p-2 my-1">{m.title} - {m.notes} ({m.content ? 'has content' : 'no content'})</li>)}
          </ul>
        </div>
        <Button type="submit">Create Course</Button>
      </form>
    </div>
  );
}
