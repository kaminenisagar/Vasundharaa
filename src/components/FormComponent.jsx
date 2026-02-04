// src/components/FormComponent.jsx
import React, { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    id: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.id.trim()) newErrors.id = 'ID is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setFormData({ name: '', email: '', id: '', password: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h3>Registration Form</h3>
        
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="id">User ID *</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Enter your user ID"
            className={errors.id ? 'error' : ''}
          />
          {errors.id && <span className="error-message">{errors.id}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Submit Form
        </button>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <h3>Submitted Data:</h3>
          <div className="data-grid">
            <div className="data-item">
              <strong>Name:</strong> {submittedData.name}
            </div>
            <div className="data-item">
              <strong>Email:</strong> {submittedData.email}
            </div>
            <div className="data-item">
              <strong>ID:</strong> {submittedData.id}
            </div>
            <div className="data-item">
              <strong>Password:</strong> {'•'.repeat(submittedData.password.length)}
            </div>
          </div>
          <p className="success-message">
            <i className="fas fa-check-circle"></i> Form submitted successfully!
          </p>
        </div>
      )}

      <div className="form-info">
        <p><i className="fas fa-info-circle"></i> All fields are required. Password is masked for security.</p>
      </div>
    </div>
  );
};

export default FormComponent;