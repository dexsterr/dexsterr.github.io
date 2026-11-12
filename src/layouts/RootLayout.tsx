import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import CyberBackground from '../components/CyberBackground';
import ShaderBackground from '../components/ShaderBackground';
import SocialLinks from '../components/SocialLinks';
import SmoothScroll from '../components/SmoothScroll';
import Preloader from '../components/Preloader';
import LanguageToggle from '../components/LanguageToggle';

const RootLayout = () => {
  return (
    <SmoothScroll>
      <Preloader />

      <div className="min-h-screen cyber-bg relative">
        {/* persistent backdrop */}
        <ShaderBackground />
        <CyberBackground />

        {/* persistent chrome: top nav + bottom-left social rail + language toggle */}
        <Navigation />
        <SocialLinks />
        <LanguageToggle />

        <main className="relative z-10">
          <Outlet />
        </main>
      </div>
    </SmoothScroll>
  );
};

export default RootLayout;
