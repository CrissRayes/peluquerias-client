import { useNavigate } from 'react-router-dom';

export const useVerDetalle = () => {
  const navigate = useNavigate();

  const handleVerDetalle = (idPeluqueria) => {
    navigate(`/detalles/${idPeluqueria}`);
  };

  return { handleVerDetalle };
};
