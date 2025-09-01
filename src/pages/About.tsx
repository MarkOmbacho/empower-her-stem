import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  useEffect(() => navigate('/report'), [navigate]);
  return null;
};

export default About;