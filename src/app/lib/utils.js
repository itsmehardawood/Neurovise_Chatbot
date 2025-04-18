// src/lib/utils.js

export const getUserIdFromToken = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
        return decoded.user_id; // Assuming user_id is present in the token payload
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
    return null; // Return null if no token is found or there's an error
  };
  