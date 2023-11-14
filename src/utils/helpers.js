import { useState, useEffect } from 'react';

export function formatTime(minutes) {
    if (isNaN(minutes) || minutes < 0) {
      return "Некорректное значение";
    }
  
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    const hoursText = hours > 0 ? `${hours}ч` : '';
    const minutesText = remainingMinutes > 0 ?  `${remainingMinutes}м` : '';
  
    return `${hoursText} ${minutesText}`;
}

export const useFormValidation = (initialData, validationRules) => {
  const [data, setData] = useState(initialData);
  const [isValid, setIsValid] = useState(validationRules);

  const [touched, setTouched] = useState(
    Object.keys(initialData).reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );

  const [errors, setErrors] = useState(
    Object.keys(initialData).reduce((acc, key) => ({ ...acc, [key]: '' }), {})
  );

  useEffect(() => {
    const validateField = (fieldName) => {
      if (validationRules[fieldName]) {
        const value = data[fieldName];
        const rule = validationRules[fieldName];

        if (touched[fieldName]) {
          if (rule.test(value)) {
            setIsValid((prev) => ({ ...prev, [fieldName]: true }));
            setErrors((prev) => ({ ...prev, [fieldName]: '' }));
          } else {
            setIsValid((prev) => ({ ...prev, [fieldName]: false }));
            setErrors((prev) => ({ ...prev, [fieldName]: rule.error }));
          }
        }
      }
    };

    Object.keys(data).forEach((fieldName) => {
      validateField(fieldName);
    });
  }, [data, touched, validationRules]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return { data, isValid, touched, errors, handleChange };
};
