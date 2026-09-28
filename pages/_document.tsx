import { Head, Html, Main, NextScript } from "next/document";

// `output: "export"` rejects the i18n config that used to set this lang attribute.
export default function Document() {
  return (
    <Html lang="en-US">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
