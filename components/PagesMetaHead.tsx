import Head from "next/head";

type Props = {
  title?: string;
  keywords?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  robots?: string;
};

const siteUrl = "https://portfolio.trebeljahr.com";
const siteName = "Rico Trebeljahr Portfolio";
const defaultImage = "/images/profile.jpg";
const defaultImageAlt = "Portrait of Rico Trebeljahr";

function PagesMetaHead({
  title = "Rico Trebeljahr - Full-Stack Engineer",
  keywords = "Rico Trebeljahr, full-stack engineer, React, Next.js, TypeScript, web games, 3D web",
  description = "Full-stack engineer portfolio for Rico Trebeljahr, featuring web games, 3D demos, production engineering work, and contact details.",
  path = "/",
  image = defaultImage,
  imageAlt = defaultImageAlt,
  imageWidth = 2500,
  imageHeight = 2500,
  robots = "index,follow",
}: Props) {
  const canonicalUrl = new URL(path, siteUrl).toString();
  const imageUrl = new URL(image, siteUrl).toString();

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
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ricotrebeljahr" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <title>{title}</title>
    </Head>
  );
}

export default PagesMetaHead;
