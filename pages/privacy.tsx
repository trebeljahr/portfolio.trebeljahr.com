import Link from "next/link";
import type { ReactNode } from "react";
import PagesMetaHead from "../components/PagesMetaHead";

// Update this date, and the host list below, whenever the site starts or stops
// contacting a server (a script, a font, an image, an embed, a fetch call) or
// changes what it keeps in the browser (a storage key, a cache, a cookie).
const UPDATED_ON = "October 19, 2026";

const PRIVACY_EMAIL = "imprint+portfolio@trebeljahr.com";

const linkClass =
  "text-secondary-dark dark:text-secondary-light hover:text-indigo-600 dark:hover:text-indigo-300 hover:underline";
const paragraphClass = "text-lg text-ternary-dark dark:text-ternary-light leading-relaxed";
const listClass = `${paragraphClass} list-disc space-y-2 pl-6`;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8 space-y-3">
      <h2 className="text-xl sm:text-2xl font-general-medium text-primary-dark dark:text-primary-light mb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Host({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[0.9em] text-primary-dark dark:text-primary-light break-words">
      {children}
    </code>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={linkClass} rel="noreferrer">
      {children}
    </a>
  );
}

function PrivacyMail() {
  return (
    <a href={`mailto:${PRIVACY_EMAIL}`} className={linkClass}>
      {PRIVACY_EMAIL}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PagesMetaHead
        title="Privacy | Rico Trebeljahr"
        description="Every server your browser contacts on portfolio.trebeljahr.com, what each one receives, and your rights under the GDPR."
        path="/privacy"
        image="/images/profile.jpg"
        imageAlt="Portrait of Rico Trebeljahr"
      />
      <div className="container mx-auto max-w-3xl px-4 py-20 font-general-regular">
        <p className="mb-6">
          <Link href="/" className={linkClass}>
            &larr; Back to Portfolio
          </Link>
        </p>
        <h1 className="text-3xl sm:text-4xl font-general-medium text-primary-dark dark:text-primary-light mb-2">
          Privacy Policy
        </h1>
        <p className="text-lg italic text-ternary-dark dark:text-ternary-light mb-8">
          Last updated: {UPDATED_ON}
        </p>

        <p className={`${paragraphClass} mb-8`}>
          This page lists every server your browser contacts when you open portfolio.trebeljahr.com,
          and what each one receives. The site has no accounts and no newsletter. It sets no
          cookies. It has one contact form, and the form sends data only when you click Send
          Message.
        </p>

        <Section title="Controller">
          <p className={paragraphClass}>
            The controller under the EU General Data Protection Regulation (GDPR) is the service
            provider named in the{" "}
            <Link href="/imprint" className={linkClass}>
              imprint
            </Link>
            : Rico Trebeljahr, c/o Block Services, Stuttgarter Str. 106, 70736 Fellbach, Germany.
            Email for privacy questions: <PrivacyMail />.
          </p>
        </Section>

        <Section title="Servers your browser contacts">
          <ul className={listClass}>
            <li>
              <Host>portfolio.trebeljahr.com</Host>: the site itself, served by Cloudflare. Pages,
              scripts, images, fonts and the CV file all come from here.
            </li>
            <li>
              <Host>static.cloudflareinsights.com</Host>: the script of Cloudflare Web Analytics.
              Visitors in the EU, the EEA, the United Kingdom and Switzerland do not get it.
            </li>
            <li>
              <Host>plausible.trebeljahr.com</Host>: my own Plausible Analytics server.
            </li>
            <li>
              <Host>forms-api.ricoslabs.workers.dev</Host>: the Cloudflare Worker that receives your
              message. Your browser contacts it only when you click Send Message.
            </li>
            <li>
              <Host>a.nel.cloudflare.com</Host>: the address where Cloudflare asks your browser to
              send error reports about that Worker. Your browser can contact it only after you sent
              the contact form and a later request to the Worker failed.
            </li>
          </ul>
          <p className={paragraphClass}>
            No other server receives a request from your browser. A link to another site, such as
            GitHub, LinkedIn or one of my projects, contacts that site only when you click it.
          </p>
        </Section>

        <Section title="Hosting by Cloudflare">
          <p className={paragraphClass}>
            The site is a set of static files. Cloudflare, Inc., 101 Townsend St, San Francisco, CA
            94107, USA, serves them from its Worker <Host>portfolio</Host>. No code of mine runs on
            a server when you load a page.
          </p>
          <p className={paragraphClass}>
            Cloudflare receives your IP address, the address of the page, the user agent and the
            referrer of each request. It uses them to deliver the site and to protect it against
            abuse. I do not export or keep logs of these requests.
          </p>
          <p className={paragraphClass}>
            The font (General Sans), the images, the icons and the CV file are copies on
            portfolio.trebeljahr.com. Your browser contacts no font service and no image service.
          </p>
          <p className={paragraphClass}>
            Legal basis: Art. 6 (1) (f) GDPR (legitimate interest in delivering the site securely).
          </p>
        </Section>

        <Section title="Cloudflare Web Analytics">
          <p className={paragraphClass}>
            Cloudflare adds the script of{" "}
            <ExternalLink href="https://developers.cloudflare.com/web-analytics/">
              Cloudflare Web Analytics
            </ExternalLink>{" "}
            to each page. Your browser loads it from <Host>static.cloudflareinsights.com</Host>, and
            the script sends its report to <Host>portfolio.trebeljahr.com/cdn-cgi/rum</Host>.
          </p>
          <p className={paragraphClass}>
            The report holds the page URL, the referrer, the versions of your browser and operating
            system, and the load times of the page. The timings include Largest Contentful Paint,
            Interaction to Next Paint and Cumulative Layout Shift. Cloudflare shows me totals by
            page, country, browser and device type.
          </p>
          <p className={paragraphClass}>
            The script sets no cookies and writes no data about you to your device. It gives each
            page view a random ID and keeps no ID from one page view to the next. Cloudflare
            receives your IP address with the report, discards it at the nearest data center and
            does not store it.
          </p>
          <p className={paragraphClass}>
            Visitors who connect through a Cloudflare data center in the EU, the EEA, the United
            Kingdom or Switzerland do not get the script. For all other visitors the legal basis is
            Art. 6 (1) (f) GDPR (legitimate interest in knowing how fast the pages load). You can
            object at any time, or block <Host>static.cloudflareinsights.com</Host> with a content
            blocker.
          </p>
        </Section>

        <Section title="Plausible Analytics">
          <p className={paragraphClass}>
            I count visits with{" "}
            <ExternalLink href="https://plausible.io/data-policy">Plausible Analytics</ExternalLink>
            . It runs on my own server at <Host>plausible.trebeljahr.com</Host>, rented from Hetzner
            Online GmbH in Nuremberg, Germany. Requests to it pass through Cloudflare as described
            under Hosting.
          </p>
          <p className={paragraphClass}>
            Your browser loads the Plausible script from <Host>plausible.trebeljahr.com</Host> and
            sends its events there. That server receives your IP address and user agent. I do not
            route these requests through portfolio.trebeljahr.com, so a content blocker can stop
            them. The site works the same without them.
          </p>
          <p className={paragraphClass}>
            Plausible sets no cookies and writes no data about you to your device. It combines your
            IP address and user agent with a salt that changes every day, and stores only the
            resulting hash. It deletes the salt after 24 hours, so nobody can trace the hash back to
            you. It never stores the IP address.
          </p>
          <p className={paragraphClass}>
            Plausible records the page address, the referrer, the browser, the operating system, the
            device type and the country. It also records clicks on links to other sites, with the
            address of the link, and downloads of the CV file. It measures how far you scroll and
            how long the page has your attention. The script loads only on portfolio.trebeljahr.com,
            not on local or test copies of the site.
          </p>
          <p className={paragraphClass}>
            The script reads one entry in your local storage, <Host>plausible_ignore</Host>. When
            its value is <Host>true</Host>, the script sends nothing. Nothing on this site sets it,
            and the script writes nothing.
          </p>
          <p className={paragraphClass}>
            Legal basis: Art. 6 (1) (f) GDPR (legitimate interest in knowing which pages people
            read). You can object at any time.
          </p>
        </Section>

        <Section title="Contact form">
          <p className={paragraphClass}>
            The contact form on the home page asks for your name, your email address, a subject and
            a message. Your browser sends nothing while you type. When you click Send Message, it
            sends the four fields to <Host>forms-api.ricoslabs.workers.dev</Host>. It adds a hidden
            field. People leave it empty, and spam bots fill it. Plausible does not see what you
            type.
          </p>
          <p className={paragraphClass}>
            That address is a Cloudflare Worker that I run in my own Cloudflare account. It checks
            the fields. It counts the requests from your IP address and allows three per minute.
            Then it passes the message to my own Listmonk server at{" "}
            <Host>listmonk.trebeljahr.com</Host>, which runs at Hetzner Online GmbH in Nuremberg,
            Germany. Listmonk sends the message as an email through Amazon SES in Ireland to my
            mailbox at Google. Your address is in the Reply-To field, so I can answer you.
          </p>
          <p className={paragraphClass}>
            The Worker keeps no copy of your message. Cloudflare logs each call to the Worker
            (Workers Logs). A log entry holds the metadata and the headers of the request, which can
            include your IP address and your browser&rsquo;s user agent. Cloudflare keeps these
            entries for seven days at most. My code adds only status lines to the log, such as a
            rate-limit or an error code.
          </p>
          <p className={paragraphClass}>
            Cloudflare adds a Network Error Logging header to each response of the Worker. The
            header tells your browser to send a report to <Host>a.nel.cloudflare.com</Host> when a
            request to the Worker fails, for the next seven days. It asks for no report when a
            request succeeds.
          </p>
          <p className={paragraphClass}>
            I use your name, your address and your message to answer you. Legal basis: Art. 6 (1)
            (b) GDPR if you write about a contract with me, otherwise Art. 6 (1) (f) GDPR
            (legitimate interest in answering you). The site works without the form. You can write
            an email instead.
          </p>
        </Section>

        <Section title="Email">
          <p className={paragraphClass}>
            The site names two email addresses. Mail to <PrivacyMail /> goes to Cloudflare Email
            Routing, which forwards it to my mailbox at Google. Mail to hello@ricotrebeljahr.com
            goes to the mail servers of Forward Email (forwardemail.net), which forward it to my
            mailbox at Google.
          </p>
          <p className={paragraphClass}>
            Your browser contacts neither service when you click an address. Your email program
            sends the message. I use your message and your address to answer you. Legal basis: Art.
            6 (1) (f) GDPR (legitimate interest in answering you).
          </p>
        </Section>

        <Section title="Data in your browser">
          <p className={paragraphClass}>
            Your browser keeps the entries below. None of them leaves your device. You can delete
            all of them by clearing the site data in your browser.
          </p>
          <ul className={listClass}>
            <li>
              <Host>theme</Host> in local storage: your choice of the light or the dark theme. The
              site writes it when you click the theme button, and reads it on your next visit.
            </li>
            <li>
              A service worker with the scope <Host>/</Host>. It makes the site open without a
              connection.
            </li>
            <li>
              Cache Storage: copies of the pages and files of the site, so that it opens without a
              connection. The caches include{" "}
              <Host>workbox-precache-v2-https://portfolio.trebeljahr.com/</Host>,{" "}
              <Host>start-url</Host> and <Host>pages</Host>.
            </li>
            <li>
              The Cache Storage cache <Host>cross-origin</Host>: copies of the scripts from{" "}
              <Host>static.cloudflareinsights.com</Host> and <Host>plausible.trebeljahr.com</Host>.
              The service worker counts a copy as expired after one hour.
            </li>
            <li>
              The IndexedDB database <Host>workbox-expiration</Host>: the service worker&rsquo;s
              record of when it stored each copy.
            </li>
            <li>
              After you send the contact form: a Network Error Logging policy for{" "}
              <Host>forms-api.ricoslabs.workers.dev</Host>, which your browser keeps for seven days.
              The browser stores it, not the site.
            </li>
          </ul>
          <p className={paragraphClass}>
            Legal basis for the theme entry: § 25 (2) No. 2 TDDDG (storage that you asked for by
            clicking the button).
          </p>
        </Section>

        <Section title="Transfers outside the EU">
          <p className={paragraphClass}>
            Cloudflare, Inc. is established in the United States. It handles each request in a data
            center of its network, normally the one nearest to you. Google is established in the
            United States too. Access by U.S. authorities under U.S. law cannot be fully excluded.
            My Plausible and Listmonk servers are in Germany. Amazon SES handles the contact form
            email in Ireland.
          </p>
        </Section>

        <Section title="Storage period">
          <ul className={listClass}>
            <li>
              Plausible keeps its events with no time limit. Each event carries only the daily hash,
              which nobody can link to you once the salt is deleted after 24 hours.
            </li>
            <li>
              Cloudflare Web Analytics keeps totals by page, country, browser and device type.
              Cloudflare does not store the IP address.
            </li>
            <li>
              The Worker of the contact form keeps no copy of your message. Cloudflare keeps the log
              entries of the Worker for seven days at most. Your message stays in my mailbox until I
              delete it.
            </li>
            <li>
              The entries in your browser stay there until you delete them, until the service worker
              replaces them, or until the period named under Data in your browser ends.
            </li>
          </ul>
        </Section>

        <Section title="Your rights">
          <p className={paragraphClass}>Under the GDPR you have the right to:</p>
          <ul className={listClass}>
            <li>access the personal data held about you (Art. 15);</li>
            <li>have inaccurate data corrected (Art. 16);</li>
            <li>
              have your data deleted (Art. 17), unless a legal obligation requires me to keep it;
            </li>
            <li>restrict processing (Art. 18);</li>
            <li>receive your data in a portable format (Art. 20);</li>
            <li>
              object to processing based on legitimate interest (Art. 21), which includes both kinds
              of analytics above.
            </li>
          </ul>
          <p className={paragraphClass}>
            To use any of these rights, email <PrivacyMail />. You can also complain to a
            supervisory authority (Art. 77 GDPR). The authority responsible for me is the
            Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg.
          </p>
          <p className={paragraphClass}>
            The site makes no automated decisions about you and builds no profile of you (Art. 22
            GDPR).
          </p>
        </Section>

        <Section title="Changes">
          <p className={paragraphClass}>
            I update this page when the site starts or stops using a server, or changes what it
            keeps in your browser. The date at the top shows the last change.
          </p>
        </Section>
      </div>
    </>
  );
}
