import Head from 'next/head'

type Props = {
  title?: string
  keywords?: string
  description?: string
}

function PagesMetaHead({
  title = "Rico Trebeljahr's Epic Portfolio",
  keywords = 'next.js, react, web, ui',
  description = "Take a peek at Rico Trebeljahr's portfolio webpage",
}: Props) {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      <link rel='icon' href='/favicon.ico' />
      <title>{title}</title>
    </Head>
  )
}

export default PagesMetaHead
