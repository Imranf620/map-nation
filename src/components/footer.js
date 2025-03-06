import React from 'react';

const Footer = () => {
  return (
    <div>
      <hr className="text-gray-600 w-[80%] mx-auto h-[0.1px] mt-20" />
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-6 w-[80%] pt-10 mx-auto gap-4">
        
        {/* Left Section */}
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-500 font-medium">
            © Copyright 2023 - FAP-NATION.ORG
          </p>
        </div>

        {/* Right Section */}
        <div>
          <ul className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-gray-500 font-medium">
            <li>
              <a href="https://fap-nation.org/contact/" className="hover:text-orange-500">
                Contact Us
              </a>
            </li>
            <li>
              <a href="https://fap-nation.org/disclaimer/" className="hover:text-orange-500">
                Disclaimer
              </a>
            </li>
            <li>
              <a href="https://fap-nation.org/privacy-policy/" className="hover:text-orange-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="https://fap-nation.org/terms-of-service/" className="hover:text-orange-500">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
