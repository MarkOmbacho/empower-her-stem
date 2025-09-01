import Header from "@/components/layout/Header";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  useEffect(() => navigate('/report'), [navigate]);
  return null;
};

export default Index;
      <Header />
