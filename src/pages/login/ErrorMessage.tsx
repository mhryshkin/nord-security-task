import { FC } from 'react';

type ErrorMessageProps = {
  children: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ children }) => {
  return <div className="text-red-500 text-xs pl-3">{children}</div>;
};

export default ErrorMessage;
