import React, { useState } from "react";
import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  confirmEmail: Joi.string().valid(Joi.ref("email")).required(),
});

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleBlur = ({ target }) => {
    setTouched({
      ...touched,
      [target.name]: true,
    });
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  };

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    setTouched({
      ...touched,
      [target.name]: false,
    });
    setErrors({
      ...errors,
      [target.name]: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
      setTouched(
        Object.keys(formData).reduce(
          (touchedFields, fieldName) => ({
            ...touchedFields,
            [fieldName]: true,
          }),
          {}
        )
      );
    } else {
      console.log("Form data is valid:", formData);
      // Add your form submission logic here
    }
  };
};

const isFieldValid = (name) => {
  return !errors[name] && (touched[name] || Object.keys(touched).length === 0);
};

return (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        onChange={handleChange}
        onBlur={handleBlur}
        className={isFieldValid("username") ? "" : "error"}
      />
      {!isFieldValid("username") && (
        <div className="error">{errors.username}</div>
      )}
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        className={isFieldValid("password") ? "" : "error"}
      />
      {!isFieldValid("password") && (
        <div className="error">{errors.password}</div>
      )}
    </div>
  </form>
);
export default RegisterForm;
