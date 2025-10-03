import React from 'react';

// Simple icon components using emojis
const Home = ({ className }) => <span className={className}>🏠</span>;
const PawPrint = ({ className }) => <span className={className}>🐾</span>;
const Activity = ({ className }) => <span className={className}>📊</span>;
const BarChart3 = ({ className }) => <span className={className}>📈</span>;
const FileText = ({ className }) => <span className={className}>📄</span>;

export function Navigation({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'pets', label: 'Pets', icon: PawPrint },
    { id: 'logs', label: 'Logs', icon: Activity },
    { id: 'reports', label: 'Reports', icon: FileText },
    // { id: 'graphs', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <PawPrint className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-blue-500">PetRecord</span>
          </div>
          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg'
                      : 'hover:bg-gray-100 text-gray-700 hover:scale-105'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="hidden sm:inline relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
