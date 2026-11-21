import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...rest }) => (
  <button className={`btn ${className}`} {...rest}>
    {children}
  </button>
);

export default Button;
