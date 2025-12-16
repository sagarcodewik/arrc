module.exports = {
    theme: {
      extend: {
        keyframes: {
          rotateOnce: {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(9.33171deg)' },
          },
        },
        animation: {
          rotateOnce: 'rotateOnce 0.5s ease-in-out forwards',
        },
      },
    },
  };
  