import {useState} from 'react';

function useInput(initialValue) {
  const [value, setvalue] = useState(initialValue);

  const bind = {
    value,
    onChange: e => {
      setvalue(e.target.value);
    },
  };

  return [value, bind];
}

export default useInput;
