import { ChangeEventHandler, useState } from "react";

type UseInputReturnType = [string, ChangeEventHandler<HTMLInputElement>, ChangeEventHandler<HTMLInputElement>];

function useInput(initialValue?: string): UseInputReturnType {
  const [value, setValue] = useState(initialValue || '');
  
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  }

  const clear = () => {
    setValue('');
  }

  return [value, handleChange, clear];
}

export default useInput;