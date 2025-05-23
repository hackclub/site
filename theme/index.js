// ...existing code...

const theme = {
  // ...existing code...
  
  colors: {
    // ...existing colors...
    
    // Add our custom colors
    orange: '#FF4500',
    orangeLight: '#FF8C00',
    orangeWash: 'rgba(255, 69, 0, 0.1)',
    dark: '#000000',
    darkless: '#101010',
    
    // Update the theme colors
    modes: {
      dark: {
        // ...existing dark mode colors...
        primary: '#FF4500',
        accent: '#FF8C00',
        orange: '#FF4500',
        orangeLight: '#FF8C00',
        orangeWash: 'rgba(255, 69, 0, 0.1)',
        dark: '#000000',
        darkless: '#101010',
      }
    }
  },
  
  // ...existing code...
  
  buttons: {
    // ...existing button styles...
    
    // Add custom button variants
    ctaLg: {
      py: 3,
      px: 4,
      fontSize: 3,
      fontWeight: 'bold',
      borderRadius: 'circle',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      ':hover,:focus': {
        transform: 'translateY(-2px)',
        boxShadow: 'elevated'
      }
    },
    outlineLg: {
      variant: 'buttons.outline',
      py: 3,
      px: 4,
      fontSize: 3,
      fontWeight: 'bold',
      borderRadius: 'circle',
      borderWidth: 2,
      transition: 'transform 0.2s ease-in-out',
      ':hover,:focus': {
        transform: 'translateY(-2px)'
      }
    }
  },
  
  // ...existing code...
}

// ...existing code...