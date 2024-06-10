import { useState, useEffect } from 'react';

const useQuery = () => {
  // Definir las categorías de dispositivos basadas en media queries
  const breakpoints = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)',
  };

  // Función para determinar la categoría actual
  const getDeviceCategory = () => {
    if (window.matchMedia(breakpoints.mobile).matches) {
      return { mediaQuery: breakpoints.mobile, category: 'mobile' };
    } else if (window.matchMedia(breakpoints.tablet).matches) {
      return { mediaQuery: breakpoints.tablet, category: 'tablet' };
    } else if (window.matchMedia(breakpoints.desktop).matches) {
      return { mediaQuery: breakpoints.desktop, category: 'desktop' };
    }
  };

  // Inicializar el estado con la categoría actual
  const [deviceCategory, setDeviceCategory] = useState(getDeviceCategory());

  useEffect(() => {
    // Función para actualizar la categoría cuando cambia la media query
    const handleResize = () => {
      setDeviceCategory(getDeviceCategory());
    };

    // Agregar un event listener para el evento de resize
    window.addEventListener('resize', handleResize);

    // Actualizar la categoría inicial
    handleResize();

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { device: deviceCategory?.category };
};

export default useQuery;
