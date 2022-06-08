import clsx from 'clsx';

function Card({ children, className, title, padding = true }) {
  return (
    <div className={clsx(padding && 'p-5', className, 'border-x-gray-100 md:rounded-lg border bg-white')}>
      {title && <div className={clsx(!padding && 'p-5', 'font-semibold mb-3')}>{title}</div>}
      <div>{children}</div>
    </div>
  );
}

export default Card;
