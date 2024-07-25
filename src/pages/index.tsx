import React from 'react';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto">
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
