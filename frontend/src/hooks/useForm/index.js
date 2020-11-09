import { useState } from 'react';

const useForm = obj => {
  const [form, setForm] = useState(obj);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return [form, handleChange];
}

export default useForm;