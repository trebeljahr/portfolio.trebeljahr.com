import PagesMetaHead from 'components/PagesMetaHead'
import Image from 'next/image'
import profile from '../public/images/profile.jpg'
import styles from '../styles/cv.module.css'

export default function CVPage() {
  return (
    <>
      <PagesMetaHead title='Resume | Rico Trebeljahr' />
      <div id='cv' className={styles['cv-container']}>
        <div className={styles['cv-header']}>
          <Image
            className={`${styles['cv-circular']} ${styles['cv-image']}`}
            src={profile}
            alt='profile picture of Rico Trebeljahr'
          />
          <div>
            <div className={styles['cv-name-heading']}>
              <h1 className={`${styles['cv-job-title']}`}>Fullstack Engineer</h1>
              <h2 className={styles['cv-black-heading']}>Rico Trebeljahr</h2>
            </div>
            <div className={styles['cv-contact-info']}>
              <a href='mailto:ricotrebeljahr@gmail.com' className='w-fit hover-underline-animation'>
                ricotrebeljahr@gmail.com
              </a>
              <a href='https://github.com/trebeljahr' className='w-fit hover-underline-animation'>
                github.com/trebeljahr
              </a>
              <a href='https://www.linkedin.com/in/trebeljahr/' className='w-fit hover-underline-animation'>
                linkedin.com/in/trebeljahr/
              </a>
            </div>
          </div>
        </div>
        <div className={styles['cv-section']}>
          <h3>About Me</h3>
          <p>
            Self-taught fullstack engineer with production experience at ESA, Klarna, and Henkel. I pick up new tech
            stacks quickly (Go, Python, GLSL) and have multiple deployed personal projects, all open source on GitHub.
          </p>
        </div>
        <div className={`${styles['cv-section']} ${styles['cv-main-section']}`}>
          <h2 className={styles['cv-black-heading']}>Work</h2>
          <div className={styles['cv-divider']} />
        </div>

        <div className={styles['cv-section']}>
          <div>
            <h3>Independent</h3>
            <p className={styles['cv-date']}>2023 &ndash; Present</p>
          </div>
          <p>
            Built{' '}
            <a href='https://playtiao.com' className='hover-underline-animation'>
              Tiao
            </a>
            , a multiplayer strategy game, in 2 weeks. Real-time WebSocket gameplay, ELO matchmaking, auth, payments,
            analytics. Deployed on Hetzner with Terraform and CI/CD. Also built 39 interactive 3D web demos with React
            Three Fiber and custom GLSL shaders, and a custom publishing platform (
            <a href='https://ricos.site' className='hover-underline-animation'>
              ricos.site
            </a>
            ) serving 300+ pages with newsletter infrastructure.
          </p>
        </div>

        <div className={styles['cv-section']}>
          <div>
            <h3>Flowkey</h3>
            <p className={styles['cv-date']}>Oct. 2025</p>
          </div>
          <p>Implemented different cookie consent designs for Flowkey in their Next.js powered website and webapp.</p>
        </div>

        <div className={styles['cv-section']}>
          <div>
            <h3>Henkel Dx</h3>
            <p className={styles['cv-date']}>Mar. &ndash; Oct. 2023</p>
          </div>
          <p>
            Sole developer on an enterprise data pipeline processing 100k+ events/day. Azure Cloud Functions, SAP +
            Facebook + Adobe integration. Inherited an undocumented system, reverse-engineered it, built testing from
            zero, delivered features, and did a clean handover to 2 replacements. Recruited directly via LinkedIn.
          </p>
        </div>
        <div className={styles['cv-section']}>
          <div>
            <h3>Ironhack</h3>
            <p className={styles['cv-date']}>Jan. 2022 &ndash; Jun. 2023</p>
          </div>
          <p>
            Lead teacher. Taught 60+ career changers fullstack JavaScript across 3 bootcamp cohorts, taking them from
            zero to deployed full-stack apps in 9 weeks. Majority landed developer roles.
          </p>
        </div>
        <div className={styles['cv-section']}>
          <div>
            <h3>ESA (Space Debris Office)</h3>
            <p className={styles['cv-date']}>Oct. &ndash; Dec. 2021</p>
          </div>
          <p>
            Built satellite collision-avoidance tools for the European Space Agency. Unified orbit data pipeline across
            10-20 tools and all major formats. Modernized CI/CD and testing. Learned production Python (Flask,
            SQLAlchemy) on the job within weeks.
          </p>
        </div>
        <div className={styles['cv-section']}>
          <div>
            <h3>Klarna</h3>
            <p className={styles['cv-date']}>Jan. &ndash; Jul. 2021</p>
          </div>
          <p>
            Software Engineer II. Built E2E testing infrastructure from scratch for Klarna&apos;s Chrome extension
            (Cypress, CI/CD). Extension scaled from 0 to 10k DAU. Hired above expected level after technical interview
            despite non-traditional background.
          </p>
        </div>
        <div className={styles['cv-section']}>
          <div>
            <h3>Softgames</h3>
            <p className={styles['cv-date']}>Jun. 2019 &ndash; Apr. 2020</p>
          </div>
          <p>
            Backend developer. Led architecture selection and implementation for a Snapchat multiplayer quiz game.
            Learned Go in 2 weeks, built real-time matchmaking and state sync on Nakama, designed for 10M DAU on Google
            Cloud. Co-led a 2-person backend team.
          </p>
        </div>

        <div className={`${styles['cv-section']} ${styles['cv-main-section']}`}>
          <h2 className={styles['cv-black-heading']}>Projects</h2>
          <div className={styles['cv-divider']} />
        </div>

        <div className={styles['cv-section']}>
          <div>
            <h3>Tiao</h3>
            <p className={styles['cv-date']}>2026</p>
          </div>
          <p>
            Multiplayer strategy game built in 2 weeks. Real-time WebSocket gameplay, ELO matchmaking, auth, payments,
            analytics. Open source (AGPL).{' '}
            <a href='https://playtiao.com' className='hover-underline-animation'>
              playtiao.com
            </a>
          </p>
        </div>

        <div className={styles['cv-section']}>
          <div>
            <h3>Fractal Garden</h3>
            <p className={styles['cv-date']}>2021, expanded 2026</p>
          </div>
          <p>
            Interactive exhibition of 37 fractals with custom GPU shaders and L-system generation. 157 GitHub stars,
            Hacker News front page.{' '}
            <a href='https://fractal.garden' className='hover-underline-animation'>
              fractal.garden
            </a>
          </p>
        </div>

        <div className={styles['cv-section']}>
          <div>
            <h3>Minecraft Clone</h3>
            <p className={styles['cv-date']}>2021 &ndash; 2023</p>
          </div>
          <p>
            Procedural voxel world in the browser. Layered Perlin noise for biomes, 3D subtractive noise for caves,
            block placing, inventory, lighting. Three.js.{' '}
            <a href='https://mc.trebeljahr.com' className='hover-underline-animation'>
              mc.trebeljahr.com
            </a>
          </p>
        </div>

        <div className={styles['cv-section']}>
          <div>
            <h3>Asteroids</h3>
            <p className={styles['cv-date']}>2021, rebuilt 2026</p>
          </div>
          <p>
            Real-time 1v1 multiplayer space combat in the browser. Canvas rendering, Socket.io for networking.{' '}
            <a href='https://asteroids.trebeljahr.com' className='hover-underline-animation'>
              asteroids.trebeljahr.com
            </a>
          </p>
        </div>

        <div className={styles['cv-section']}>
          <div>
            <h3>Chess</h3>
            <p className={styles['cv-date']}>2019, rewritten 2026</p>
          </div>
          <p>
            Full-stack multiplayer chess with real-time chat. Originally my first ever project (Meteor), rewritten to
            Next.js + Express + Socket.io + MongoDB in 2 days.{' '}
            <a href='https://github.com/trebeljahr/chess-app' className='hover-underline-animation'>
              github.com/trebeljahr/chess-app
            </a>
          </p>
        </div>

        <div className={styles['cv-section']}>
          <div>
            <h3>conv3d</h3>
            <p className={styles['cv-date']}>2023</p>
          </div>
          <p>
            Published npm CLI tool for batch-converting 3D models (FBX/OBJ/GLTF &rarr; GLB) and auto-generating React
            Three Fiber components.{' '}
            <a href='https://github.com/trebeljahr/conv3d' className='hover-underline-animation'>
              github.com/trebeljahr/conv3d
            </a>
          </p>
        </div>

        <div className={styles['cv-section']}>
          <div>
            <h3>More Projects</h3>
          </div>
          <ul>
            <li>
              <a href='https://ricos.site/r3f' className='hover-underline-animation'>
                39 interactive 3D demos
              </a>{' '}
              with React Three Fiber and custom GLSL shaders
            </li>
            <li>
              <a href='https://quaternius.trebeljahr.com' className='hover-underline-animation'>
                Quaternius Showcase
              </a>{' '}
              &ndash; interactive 3D model viewer (React Three Fiber)
            </li>
            <li>
              <a href='https://raptor.trebeljahr.com' className='hover-underline-animation'>
                Raptor Game
              </a>{' '}
              &ndash; animated homage to Chrome&apos;s offline dinosaur (Canvas, p5.js)
            </li>
            <li>
              <a href='https://ricos.site' className='hover-underline-animation'>
                ricos.site
              </a>{' '}
              &ndash; custom publishing platform, 300+ pages, 78-edition newsletter
            </li>
            <li>
              <a href='https://tic-tac-toe.trebeljahr.com' className='hover-underline-animation'>
                Tic-Tac-Toe
              </a>{' '}
              &amp;{' '}
              <a href='https://github.com/trebeljahr/Snake-2.0' className='hover-underline-animation'>
                Snake 2.0
              </a>{' '}
              &ndash; early learning projects (2019)
            </li>
          </ul>
        </div>

        <div className={`${styles['cv-section']} ${styles['cv-main-section']}`}>
          <h2 className={styles['cv-black-heading']}>Skills</h2>
          <div className={styles['cv-divider']} />
        </div>
        <div className={styles['cv-section']}>
          <h3>Specializations</h3>
          <ul>
            <li>MVP Development</li>
            <li>Interactive 3D Web (React Three Fiber, Three.js, GLSL shaders)</li>
            <li>Real-time Multiplayer Systems (WebSockets, Nakama)</li>
            <li>Enterprise Data Pipelines &amp; Integrations</li>
            <li>Legacy System Modernization</li>
          </ul>
        </div>
        <div className={styles['cv-section']}>
          <h3>Tech</h3>
          <ul>
            <li>TypeScript, JavaScript, Python, Go, GLSL</li>
            <li>React, Next.js, Three.js, React Three Fiber</li>
            <li>Node.js, Express, Flask, SQLAlchemy</li>
            <li>AWS, Azure, Hetzner, Terraform, Docker, Ansible</li>
            <li>MongoDB, PostgreSQL, WebSockets, Cypress, Vitest</li>
          </ul>
        </div>
        <div className={styles['cv-section']}>
          <h3>Education</h3>
          <p>
            Self-taught. Completed freeCodeCamp&apos;s 2-year web development curriculum in ~2 months (2019). MIT OCW
            calculus sequence (18.01, 18.02, 18.03) and linear algebra self-studied. Multiple Coursera ML
            specializations. 200+ books read across science, philosophy, technology, and business.
          </p>
        </div>
      </div>
    </>
  )
}
