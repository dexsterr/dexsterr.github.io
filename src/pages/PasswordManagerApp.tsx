
import { ArrowLeft, Plus, Eye, EyeOff, Copy, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import CyberBackground from '../components/CyberBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PasswordEntry {
  id: string;
  website: string;
  username: string;
  password: string;
}

const PasswordManagerApp = () => {
  const [masterPassword, setMasterPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [entries, setEntries] = useState<PasswordEntry[]>([]);
  const [showMasterPassword, setShowMasterPassword] = useState(false);
  const [newEntry, setNewEntry] = useState({
    website: '',
    username: '',
    password: ''
  });
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});
  const [copySuccess, setCopySuccess] = useState<string>('');

  useEffect(() => {
    // Load encrypted data from localStorage on component mount
    const encryptedData = localStorage.getItem('encrypted_passwords');
    if (encryptedData && isUnlocked) {
      try {
        // Simple demo decryption (in real app this would use proper encryption)
        const decryptedData = JSON.parse(atob(encryptedData));
        setEntries(decryptedData);
      } catch (error) {
        console.error('Failed to decrypt data');
      }
    }
  }, [isUnlocked]);

  const saveToStorage = (data: PasswordEntry[]) => {
    // Simple demo encryption (in real app this would use proper encryption)
    const encryptedData = btoa(JSON.stringify(data));
    localStorage.setItem('encrypted_passwords', encryptedData);
  };

  const handleMasterPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterPassword.length >= 8) {
      setIsUnlocked(true);
    } else {
      alert('Master password must be at least 8 characters long');
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewEntry({ ...newEntry, password: result });
  };

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntry.website && newEntry.username && newEntry.password) {
      const entry: PasswordEntry = {
        id: Date.now().toString(),
        ...newEntry
      };
      const updatedEntries = [...entries, entry];
      setEntries(updatedEntries);
      saveToStorage(updatedEntries);
      setNewEntry({ website: '', username: '', password: '' });
    }
  };

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    saveToStorage(updatedEntries);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen cyber-bg relative">
        <Navigation />
        <CyberBackground />
        
        <div className="container mx-auto px-6 pt-24 pb-12">
          <div className="mb-8">
            <Link
              to="/portfolio"
              className="inline-flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back to Portfolio</span>
            </Link>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="cyber-border bg-black/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-center text-green-400">
                  Encrypted Password Manager
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMasterPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Master Password</label>
                    <div className="relative">
                      <input
                        type={showMasterPassword ? 'text' : 'password'}
                        value={masterPassword}
                        onChange={(e) => setMasterPassword(e.target.value)}
                        className="w-full p-3 bg-black/30 border border-green-500/30 rounded-lg text-white focus:border-green-400 focus:outline-none"
                        placeholder="Enter master password (min. 8 chars)"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowMasterPassword(!showMasterPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-green-400"
                      >
                        {showMasterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold"
                  >
                    Unlock Vault
                  </Button>
                </form>
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-400">
                    Demo Note: This is a simplified web version. Your data is stored locally in your browser.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cyber-bg relative">
      <Navigation />
      <CyberBackground />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8 flex justify-between items-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Portfolio</span>
          </Link>
          <Button 
            onClick={() => setIsUnlocked(false)}
            variant="outline"
            className="border-green-500/30 text-green-400 hover:bg-green-500/20"
          >
            Lock Vault
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            <span className="text-green-400 glow-text">Password Manager</span> - Unlocked
          </h1>

          {/* Add New Entry Form */}
          <Card className="cyber-border bg-black/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center space-x-2">
                <Plus size={20} />
                <span>Add New Password</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={addEntry} className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Website</label>
                    <input
                      type="text"
                      value={newEntry.website}
                      onChange={(e) => setNewEntry({ ...newEntry, website: e.target.value })}
                      className="w-full p-3 bg-black/30 border border-green-500/30 rounded-lg text-white focus:border-green-400 focus:outline-none"
                      placeholder="example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Username</label>
                    <input
                      type="text"
                      value={newEntry.username}
                      onChange={(e) => setNewEntry({ ...newEntry, username: e.target.value })}
                      className="w-full p-3 bg-black/30 border border-green-500/30 rounded-lg text-white focus:border-green-400 focus:outline-none"
                      placeholder="username@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Password</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newEntry.password}
                        onChange={(e) => setNewEntry({ ...newEntry, password: e.target.value })}
                        className="flex-1 p-3 bg-black/30 border border-green-500/30 rounded-lg text-white focus:border-green-400 focus:outline-none"
                        placeholder="Password"
                        required
                      />
                      <Button 
                        type="button"
                        onClick={generatePassword}
                        variant="outline"
                        className="border-green-500/30 text-green-400 hover:bg-green-500/20"
                      >
                        Generate
                      </Button>
                    </div>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold"
                >
                  Save Password
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Password Entries */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Stored Passwords ({entries.length})</h2>
            {entries.length === 0 ? (
              <Card className="cyber-border bg-black/50 backdrop-blur-sm">
                <CardContent className="text-center py-8">
                  <p className="text-gray-400">No passwords saved yet. Add your first password above!</p>
                </CardContent>
              </Card>
            ) : (
              entries.map((entry) => (
                <Card key={entry.id} className="cyber-border bg-black/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Website</label>
                        <div className="flex items-center space-x-2">
                          <span className="text-white">{entry.website}</span>
                          <button
                            onClick={() => copyToClipboard(entry.website, `website-${entry.id}`)}
                            className="text-gray-400 hover:text-green-400"
                          >
                            <Copy size={16} />
                          </button>
                          {copySuccess === `website-${entry.id}` && (
                            <span className="text-xs text-green-400">Copied!</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Username</label>
                        <div className="flex items-center space-x-2">
                          <span className="text-white">{entry.username}</span>
                          <button
                            onClick={() => copyToClipboard(entry.username, `username-${entry.id}`)}
                            className="text-gray-400 hover:text-green-400"
                          >
                            <Copy size={16} />
                          </button>
                          {copySuccess === `username-${entry.id}` && (
                            <span className="text-xs text-green-400">Copied!</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Password</label>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-mono">
                            {showPasswords[entry.id] ? entry.password : '••••••••'}
                          </span>
                          <button
                            onClick={() => togglePasswordVisibility(entry.id)}
                            className="text-gray-400 hover:text-green-400"
                          >
                            {showPasswords[entry.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                          <button
                            onClick={() => copyToClipboard(entry.password, `password-${entry.id}`)}
                            className="text-gray-400 hover:text-green-400"
                          >
                            <Copy size={16} />
                          </button>
                          {copySuccess === `password-${entry.id}` && (
                            <span className="text-xs text-green-400">Copied!</span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-400 hover:text-red-300 p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordManagerApp;
