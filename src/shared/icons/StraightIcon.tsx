import { SVGProps } from "react"

const StraightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"width={24} height={24} style={{transform: 'rotate(90deg)'}} {...props} >
    <path
      d="m0 0 30 30"
      style={{
        stroke: "#000",
        strokeWidth: 2,
      }}
    />
  </svg>
)
export default StraightIcon
