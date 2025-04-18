import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "+12705801116"; // Replace with your desired phone number (no + or spaces)

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-25 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg "
      aria-label="Contact us on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.52 3.48A11.89 11.89 0 0012 0C5.37 0 0 5.37 0 12a11.88 11.88 0 001.67 6.1L0 24l6.29-1.65A11.88 11.88 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.25-6.2-3.48-8.52zM12 21.54a9.44 9.44 0 01-4.8-1.31l-.34-.2-3.74.98.99-3.65-.22-.37A9.43 9.43 0 012.46 12c0-5.25 4.29-9.54 9.54-9.54S21.54 6.75 21.54 12 17.25 21.54 12 21.54zm5.12-6.67c-.28-.14-1.67-.82-1.93-.91s-.45-.14-.64.14-.74.91-.9 1.1-.33.21-.61.07a7.69 7.69 0 01-3.64-3.18c-.27-.46.27-.43.77-1.43.09-.18.05-.34-.03-.48s-.64-1.54-.88-2.11c-.23-.55-.47-.48-.64-.49l-.55-.01a1.06 1.06 0 00-.77.36 3.18 3.18 0 00-.99 2.35c0 1.39 1 2.73 1.13 2.91.14.18 2.01 3.08 4.88 4.32.68.29 1.21.47 1.62.6a3.87 3.87 0 001.77.11c.54-.08 1.67-.68 1.9-1.34.23-.67.23-1.25.16-1.34s-.25-.2-.53-.33z" />
      </svg>
    </button>
  );
};

export default WhatsAppButton;
