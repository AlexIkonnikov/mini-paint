import { SVGProps } from 'react';

const EraserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="4 4 26 26"
    width={24}
    height={24}
    {...props}>
    <path
      d="M18.906 4.094a3.434 3.434 0 0 0-2.281.843v.032L16.594 5 4.906 16.594c-1.212 1.212-1.204 3.184-.062 4.468l.031.032h.031l6 6c1.213 1.212 3.184 1.204 4.469.062v-.031l.031-.031L27 15.5c1.267-1.267 1.306-3.288.094-4.5l-6-6a3.06 3.06 0 0 0-2.188-.906zm-.031 2.031c.32-.001.619.087.813.281l6 6c.387.388.44 1.154-.094 1.688l-5.032 5.031-7.656-7.656 5.063-5.031.031-.032c.253-.21.569-.28.875-.281zm-7.406 6.781 7.656 7.656-5.094 5.094-.031.032c-.517.428-1.308.379-1.688 0L6.345 19.75c-.016-.018-.017-.044-.032-.063-.409-.517-.374-1.313 0-1.687l5.157-5.094z"
      color="#000"
      fontFamily="Bitstream Vera Sans"
    />
  </svg>
);
export default EraserIcon;