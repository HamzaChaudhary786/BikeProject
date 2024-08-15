import React from 'react';

const index = () => {
  return (
    <>
      <footer className="  w-full py-16">
        <hr className="w-full mb-10" style={{ border: '1px solid black' }} />
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-4 space-x-7 ">
            <a href="#" className="mx-2 text-gray-400 hover:text-white no-underline ">
              <i className="fab fa-facebook-f">Home</i>
            </a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white no-underline">
              <i className="fab fa-twitter">About</i>
            </a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white no-underline">
              <i className="fab fa-instagram">Products</i>
            </a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white no-underline">
              <i className="fab fa-linkedin-in"> Contact</i>
            </a>
          </div>
          <p className="text-sm">&copy; 2024 Your Company Name. All rights reserved.</p>
          <p className="text-xs mt-2">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>{' '}
            |
            <a href="#" className="text-gray-400 hover:text-white">
              {' '}
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default index;
