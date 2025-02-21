import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import PropTypes from 'prop-types';

export default function TimePick({label,objName}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker
          label={label}
          isRequired
          name={objName}
          className='bg-gray-100 rounded-md border border-slate-600 max-w-3 text-sm '
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

TimePick.propTypes = {
    label: PropTypes.string.isRequired,
    objName: PropTypes.string.isRequired
  };
  
  TimePick.defaultProps = {
    label: 'Select Time',
    objName: 'time-picker'
  };
