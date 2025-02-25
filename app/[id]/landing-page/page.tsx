import axios from "axios";
import PageComponent from "./PageComponent";
import Head from "next/head";

async function getMasterclassData(id: string) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API}masterclasses/${id}`,
      {
        headers: {
          "Accept-Encoding": "gzip",
        },
      }
    );
    return data?.data;
  } catch (error) {
    console.error("Error while fetching data", error);
  }
}
export default async function Page({ params }: any) {
  const { id } = params;
  const masterclassData = await getMasterclassData(id);
  return (
    <>
    <Head>
        <title> Stock Phoenix </title>
        <meta
          name="description"
          content="Stock Phoenix"
          key="desc"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5G6WR26B');
            `,
          }}
        />
      </Head>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5G6WR26B"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      <PageComponent masterclass={masterclassData} />
    </>
  );
}
