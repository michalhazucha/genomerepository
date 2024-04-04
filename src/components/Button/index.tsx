import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'; 
  icon?: ReactNode;
}



const Button = ({ variant = 'primary', icon, ...props }: ButtonProps) => {
  const className = `btn btn--${variant}`

  return (
    <button className={className} {...props}>
      {props.children} {icon && <i>{icon}</i>}
    </button>
  )
}

export default Button
