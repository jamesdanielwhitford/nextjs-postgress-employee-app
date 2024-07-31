/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'purple': {
          DEFAULT: '#7300ff',
          'dark': '#5700b3',
        },
        'background': 'rgba(223, 208, 245, 0.98)',
        'input-border': '#ced4da',
        'input-focus': '#007bff',
        'text-dark': '#343a40',
        'text-muted': '#495057',
        'table-header': '#f8f9fa',
        'edit-btn': '#17a2b8',
        'edit-btn-hover': '#117a8b',
        'delete-btn': '#dc3545',
        'delete-btn-hover': '#c82333',
      },
      backgroundColor: {
        'white-90': 'rgba(255, 255, 255, 0.90)',
      },
      boxShadow: {
        'custom': '0 10px 20px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}