import { Form } from 'react-bootstrap';
import { ScheduleSelector } from './ScheduleSelector';

export const ScheduleDay = ({ dia }) => {
  return (
    // filas de la tabla con checkbox de los dias y selectores de los horarios
    <tr>
      <td>
        <Form.Check
          type='checkbox'
          label={dia}
        />
      </td>
      <td>
        <ScheduleSelector />
      </td>
      <td>
        <ScheduleSelector />
      </td>
    </tr>
  );
};
