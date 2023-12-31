import { FC } from 'react';

type Props = {
  className?: string;
  isActive?: boolean;
};

const ArrowIcon: FC<Props> = ({ className = '', isActive }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 100 100"
      className={`${className} ${isActive ? 'fill-black' : 'fill-slate-300'}`}
      height={12}
    >
      <path
        d="M88.439,61.002L53.727,26.29c-2.058-2.058-5.396-2.058-7.454,0L11.561,61.002c-1.544,1.544-1.978,3.727-1.143,5.744
        C11.254,68.763,13.105,70,15.288,70h69.424c2.183,0,4.034-1.237,4.87-3.254C90.417,64.729,89.983,62.546,88.439,61.002z"
      />
    </svg>
  );
};

export default ArrowIcon;
