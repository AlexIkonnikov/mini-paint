import { SVGProps } from "react"

const SquareIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 330 330"
    width={24}
    height={24}
    {...props}
  >
    <path d="M315 0H15C6.716 0 0 6.716 0 15v300c0 8.284 6.716 15 15 15h300c8.284 0 15-6.716 15-15V15c0-8.284-6.715-15-15-15zm-15 300H30V30h270v270z" />
  </svg>
)
export default SquareIcon
