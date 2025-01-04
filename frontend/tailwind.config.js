module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html",
    ],
    theme: {
      extend: {
        colors: {
          'accent-yellow': '#FFA500',
          'dark-bg': '#1E1E1E',
          'dark-card': '#2d2d30',
          'dark-text': '#e2e8f0',
          'light-bg': '#dedede',
          'light-card': '#fffefc',
          'light-text': '#2d3748',
        },
      },
    },
    plugins: [],
  };