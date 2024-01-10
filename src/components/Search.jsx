import { Form } from 'react-bootstrap';
import { useSearch } from '../context/SearchContext';

export const Search = () => {
  const { search, handleSearch } = useSearch();

  return (
    <div>
      <Form.Control
        type='text'
        placeholder='Buscar peluqueria'
        aria-label='Buscar peluqueria'
        className='rounded-pill'
        aria-describedby='basic-addon2'
        style={{ textAlign: 'center' }}
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};
