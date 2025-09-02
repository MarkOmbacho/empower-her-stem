import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function TutorCourseEditor(){
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [moduleTitle, setModuleTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['','']);
  const [answerIndex, setAnswerIndex] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem('dashboardToken');

  useEffect(()=>{
    if(!courseId) return;
    api.get(`/api/courses/${courseId}`).then(res=>setCourse(res.data)).catch(()=>{});
  },[courseId]);

  const addModule = async ()=>{
    if(!moduleTitle) return alert('Module title required');
    await api.put(`/api/courses/${courseId}/modules`, { title: moduleTitle }, { headers: { Authorization: `Bearer ${token}` } });
    const res = await api.get(`/api/courses/${courseId}`); setCourse(res.data); setModuleTitle('');
  }

  const addQuestion = async (modId:any)=>{
    const payload = { question, options, answer: answerIndex };
    await api.post(`/api/courses/${courseId}/modules/${modId}/quiz`, payload, { headers: { Authorization: `Bearer ${token}` } });
    const res = await api.get(`/api/courses/${courseId}`); setCourse(res.data); setQuestion(''); setOptions(['','']);
  }

  if(!course) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Course: {course.title}</h1>
        <div className="flex gap-2">
          <Button onClick={()=>navigate('/tutor-dashboard')}>Back</Button>
        </div>
      </div>
      <div className="mb-6">
        <label className="block mb-2">Add Module</label>
        <div className="flex gap-2">
          <input value={moduleTitle} onChange={e=>setModuleTitle(e.target.value)} className="flex-1 p-2 border" />
          <Button onClick={addModule}>Add Module</Button>
        </div>
      </div>

      <div className="grid gap-4">
        {course.modules.map((m:any)=> (
          <div key={m.id} className="border p-4 rounded">
            <div className="font-semibold mb-2">{m.title}</div>
            <div className="mb-2">{m.notes}</div>
            <div className="mb-2">Quiz questions: {m.quiz?.length || 0}</div>
            <div className="mb-2">
              <label className="block mb-1">Add Quiz Question</label>
              <input value={question} onChange={e=>setQuestion(e.target.value)} className="w-full mb-2 p-2 border" placeholder="Question" />
              <div className="grid grid-cols-2 gap-2 mb-2">
                {options.map((opt,i)=> <input key={i} value={opt} onChange={e=>{ const o=[...options]; o[i]=e.target.value; setOptions(o); }} className="p-2 border" placeholder={`Option ${i+1}`} />)}
              </div>
              <div className="flex gap-2 items-center mb-2">
                <label>Answer index</label>
                <input type="number" value={answerIndex} min={0} max={options.length-1} onChange={e=>setAnswerIndex(Number(e.target.value))} className="w-16 p-1 border" />
              </div>
              <Button onClick={()=>addQuestion(m.id)}>Add Question</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
