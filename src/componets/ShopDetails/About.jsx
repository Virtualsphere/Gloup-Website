import React from 'react';

const About = ({ aboutText }) => {
  if (!aboutText) return null;

  return (
    <div className="bg-white lg:bg-gray-100 px-5 lg:px-0 pb-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-2">About</h2>
      <p className="text-gray-500 text-sm md:text-base lg:text-lg leading-relaxed">
        {aboutText}
      </p>
    </div>
  );
};

export default About;
