/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
      if (!isServer) {
        // This tells Webpack to treat your widget as an external library
        config.output.library = 'ChatbotWidget';  // Expose the widget to the global window object
        config.output.libraryTarget = 'umd';      // Make it compatible with various environments (like global, AMD, CommonJS)
        config.output.filename = 'chatbot-embed';  // Output file name
      }
  
      // Optionally, you can handle .mjs file extensions explicitly in Webpack
      config.resolve.extensions.push('.mjs');
  
      return config;
    },
  };
  
  export default nextConfig;
  