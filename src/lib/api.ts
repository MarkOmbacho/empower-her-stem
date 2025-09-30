// Lightweight mock API for frontend-only mode.
// It implements the minimal endpoints the UI expects: /api/reports, /api/courses, /api/dashboard-auth

type Handler = (url: string, data?: any, config?: any) => Promise<any>;

const storageKey = '__mock_api_data__';

const defaultState = {
  reports: [
    { _id: 'r1', title: 'Sample report', description: 'This is a demo report', status: 'pending', date: new Date().toISOString() }
  ],
  courses: [
    { _id: 'c1', title: 'Demo Course', description: 'A demo', tutor: 'Admin', enrolled: 12, modules: [{ id: 'm1', title: 'Intro', notes: 'Welcome', content: 'Content', quiz: [], certificate: false }] }
  ],
  users: [
    { id: 'u1', username: 'admin', password: 'password', email: 'admin@example.com', name: 'Admin', role: 'admin' },
    { id: 't1', username: 'tutor', password: 'password', email: 'tutor@example.com', name: 'Tutor', role: 'tutor' }
  ]
};

function readState(){
  try{ return JSON.parse(localStorage.getItem(storageKey) || 'null') || defaultState; }catch(e){ return defaultState; }
}
function writeState(s:any){ localStorage.setItem(storageKey, JSON.stringify(s)); }

const api = {
  get: async (url:string, config?:any)=>{
    const s = readState();
    if(url.startsWith('/api/reports')){
      return { data: s.reports };
    }
    if(url.startsWith('/api/courses')){
      const parts = url.split('/').filter(Boolean);
      if(parts.length===2) return { data: s.courses };
      const id = parts[2];
      const course = s.courses.find((c:any)=>c._id===id);
      return { data: course };
    }
    if(url.startsWith('/api/dashboard-auth/me')){
      const token = config?.headers?.Authorization?.replace('Bearer ','') || config?.params?.token;
      const user = s.users.find((u:any)=>`token-${u.id}`===token);
      return { data: { user: user ? { id: user.id, username: user.username, email: user.email, name: user.name, role: user.role } : null } };
    }
    return { data: null };
  },
  post: async (url:string, data?:any, config?:any)=>{
    const s = readState();
    if(url.startsWith('/api/reports')){
      const id = 'r'+Date.now();
      const report = { _id: id, title: data.title || 'Untitled', description: data.description || '', status: 'pending', date: new Date().toISOString() };
      s.reports.unshift(report); writeState(s); return { data: report };
    }
    if(url.startsWith('/api/dashboard-auth/login')){
      const user = s.users.find((u:any)=>u.username===data.username && u.password===data.password);
      if(!user) throw { response: { data: { error: 'Invalid credentials' } } };
      return { data: { token: `token-${user.id}`, user: { id: user.id, username: user.username, email: user.email, name: user.name, role: user.role } } };
    }
    if(url.startsWith('/api/dashboard-auth/register')){
      const id = 'u'+Date.now();
      const user = { id, username: data.username, password: data.password, email: data.email, name: data.name, role: data.role || 'tutor' };
      s.users.push(user); writeState(s); return { data: { user: { id: user.id, username: user.username, email: user.email, name: user.name, role: user.role } } };
    }
    if(url.startsWith('/api/courses')){
      const token = config?.headers?.Authorization?.replace('Bearer ','');
      const id = 'c'+Date.now();
      const course = { _id: id, title: data.title, description: data.description, tutor: 'You', enrolled: 0, modules: data.modules || [] };
      s.courses.unshift(course); writeState(s); return { data: course };
    }
    // other endpoints: return empty
    return { data: null };
  },
  put: async (url:string, data?:any, config?:any)=>{
    const s = readState();
    if(url.match(/\/api\/courses\/[^/]+\/modules$/)){
      const courseId = url.split('/')[3];
      const course = s.courses.find((c:any)=>c._id===courseId);
      if(!course) throw new Error('Course not found');
      const mod = { id: 'm'+Date.now(), title: data.title || 'Module', notes: data.notes || '' };
      course.modules.push(mod); writeState(s); return { data: course };
    }
    return { data: null };
  },
  delete: async (url:string, config?:any)=>{
    const s = readState();
    if(url.startsWith('/api/courses/')){
      const id = url.split('/')[3];
      s.courses = s.courses.filter((c:any)=>c._id!==id); writeState(s); return { data: { success: true } };
    }
    return { data: null };
  }
};

export default api;
