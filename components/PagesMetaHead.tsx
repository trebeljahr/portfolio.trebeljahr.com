import Head from "next/head";

type Props = {
  title?: string;
  keywords?: string;
  description?: string;
  path?: string;
  image?: string;
  robots?: string;
};

const siteUrl = "https://portfolio.trebeljahr.com";
const siteName = "Rico Trebeljahr Portfolio";
const defaultImage = "/icons/share.png";

function PagesMetaHead({
  title = "Rico Trebeljahr - Full-Stack Engineer",
  keywords = "Rico Trebeljahr, full-stack engineer, React, Next.js, TypeScript, web games, 3D web",
  description = "Full-stack engineer portfolio for Rico Trebeljahr, featuring web games, 3D demos, production engineering work, and contact details.",
  path = "/",
  image = defaultImage,
  robots = "index,follow",
}: Props) {
  const canonicalUrl = `${siteUrl}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={robots} />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <title>{title}</title>
    </Head>
  );
}

export default PagesMetaHead;
