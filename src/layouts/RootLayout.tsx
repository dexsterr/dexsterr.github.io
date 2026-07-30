import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import CyberBackground from '../components/CyberBackground';
import SocialLinks from '../components/SocialLinks';

const RootLayout = () => {
  return (
    <div className="min-h-screen cyber-bg relative">
      <Navigation />
      <CyberBackground />
      <SocialLinks />
      <Outlet />
    </div>
  );
};

export default RootLayout;
