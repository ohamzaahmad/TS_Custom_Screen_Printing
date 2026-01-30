
import React, { useEffect } from 'react';

const Catalogue: React.FC = () => {
  useEffect(() => {
    // Open external site in same tab as requested
    window.location.href = 'https://www.sportswearcollection.com/?site=';
  }, []);

  return null;
};

export default Catalogue;
