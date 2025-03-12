export const BASEURL = 
  window.location.hostname === "dev-tinder-frontend.onrender.com"
    ? "https://dev-tinder-backend-4sfg.onrender.com" // Production backend
    : "http://localhost:5000"; // Local backend (for development)
