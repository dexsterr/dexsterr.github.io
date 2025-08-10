
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Briefcase } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/portfolio', label: 'Portfolio', icon: Briefcase },
    { path: '/about', label: 'About Me', icon: User },
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex space-x-2 bg-black/90 backdrop-blur-md p-3 rounded-full cyber-border shadow-lg shadow-green-500/20">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center space-x-2 px-5 py-3 rounded-full transition-all duration-300 ${
              location.pathname === path
                ? 'bg-green-500/30 text-green-400 glow-text shadow-md shadow-green-500/30'
                : 'text-gray-300 hover:text-green-400 hover:bg-green-500/15'
            }`}
          >
            <Icon size={20} />
            <span className="text-sm font-medium tracking-wide">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
