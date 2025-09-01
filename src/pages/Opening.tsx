import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Opening = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/report'), 2000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-pulse mx-auto mb-6 w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Girls I Save</h1>
          <p className="text-sm text-muted-foreground">Preparing your secure reporting environment...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Opening;
