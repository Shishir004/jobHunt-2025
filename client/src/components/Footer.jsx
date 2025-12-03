import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          {/* Logo & About */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Job<span className="text-blue-500">Portal</span></h2>
            <p className="text-sm leading-6">
              Connecting talent with opportunities. Your one-stop platform for jobs, skills, and growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/jobs" className="hover:text-white">Jobs</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
              <li><a href="/faq" className="hover:text-white">FAQs</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
