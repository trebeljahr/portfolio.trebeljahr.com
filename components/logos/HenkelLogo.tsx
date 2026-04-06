import { SVGProps } from 'react'

export const HenkelLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 140' {...props}>
    <g fill='#E2001A'>
      <path d='M0 0h46v140H0z' />
      <path d='M0 47h130v46H0z' />
      <path d='M84 0h46v140H84z' />
    </g>
    <path
      fill='#E2001A'
      d='M176 108V32h16v30h28V32h16v76h-16V76h-28v32zm108-76h52v14h-36v16h32v14h-32v18h38v14h-54zm84 0h16l28 50V32h14v76h-14l-30-52v52h-14zm100 0h16v32l28-32h20l-30 34 32 42h-20l-24-32-6 7v25h-16zm88 0h52v14h-36v16h32v14h-32v18h38v14h-54zm84 0h16v62h36v14h-52z'
    />
  </svg>
)
