import React from 'react';

function CustomSVG({ id, className, ...props }: { id?: string; className?: string }) {
  return (
    <svg className={className} {...props}>
      <use href={`/icons/sprite.svg#${id}`} />
      {/* <use href={`./sprite.svg#${id}`} /> */}
    </svg>
  );
}

export default CustomSVG;
