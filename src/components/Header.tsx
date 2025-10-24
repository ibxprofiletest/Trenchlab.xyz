import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { CONTRACT_ADDRESS } from '../data/mockData';
import { AI_MODELS } from '../types';
import { useLiveData } from '../hooks/useLiveData';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModelsOpen, setIsModelsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { models } = useLiveData();
  const modelsDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modelsDropdownRef.current && !modelsDropdownRef.current.contains(event.target as Node)) {
        setIsModelsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
  };

  return (
    <header className="border-b-2 border-border bg-card">
      <div className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold text-primary hover:underline"
            >
              Trenchlab.xyz
            </Link>
          </div>

          {/* Contract Address - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">CA:</span>
            <button
              onClick={copyToClipboard}
              className="font-mono text-foreground hover:text-primary transition-colors relative group"
              title="Click to copy"
            >
              {CONTRACT_ADDRESS}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <Link
              to="/"
              className="px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors"
            >
              LIVE
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link
              to="/leaderboard"
              className="px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors"
            >
              LEADERBOARD
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link
              to="/teams"
              className="px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors"
            >
              TEAMS
            </Link>
            <span className="text-muted-foreground">|</span>
            <div className="relative" ref={modelsDropdownRef}>
              <button
                onClick={() => setIsModelsOpen(!isModelsOpen)}
                className="px-3 md:px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors"
              >
                MODELS ▼
              </button>
              
              {/* Models Dropdown */}
              {isModelsOpen && (
                <div className="absolute top-full right-0 mt-1 w-80 bg-card border-4 border-border shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-foreground mb-3">AI MODELS STATUS</h3>
                    <div className="space-y-2">
                      {models.map((model, index) => (
                        <div
                          key={model.id}
                          className="flex items-center justify-between p-2 border-2 border-border hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 border-2 border-border"
                              style={{ backgroundColor: model.color }}
                            />
                            <span className="text-xs font-bold text-foreground">
                              {model.displayName}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-bold text-foreground">
                              ${model.currentValue.toLocaleString()}
                            </div>
                            <div className="text-xs text-accent-foreground">
                              +{model.percentChange.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t-2 border-border">
                      <div className="text-xs text-muted-foreground">
                        Total Models: {models.length} | Live Updates: Active
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <span className="text-muted-foreground">|</span>
            <Link
              to="/about"
              className="px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors"
            >
              ABOUT
            </Link>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={toggleTheme}
              className="px-3 md:px-4 py-2 font-medium text-foreground"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t-2 border-border flex flex-col gap-2">
            <Link
              to="/"
              className="px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              LIVE
            </Link>
            <Link
              to="/leaderboard"
              className="px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              LEADERBOARD
            </Link>
            <Link
              to="/teams"
              className="px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              TEAMS
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </Link>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors text-left flex items-center gap-2"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4" /> Dark Mode
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4" /> Light Mode
                </>
              )}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
