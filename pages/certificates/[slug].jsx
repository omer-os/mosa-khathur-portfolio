import { useRouter } from "next/router";
import { client } from "../../data";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";
export default function CertificateDetailsPage({ certificate }) {
  const router = useRouter();
  console.log(certificate);

  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => setIsZoomed(!isZoomed);

  return (
    <div className="lg:w-4/6 relative sm:w-5/6  mx-auto mt-[6em] px-6">
      <Head>
        <title>{certificate.title}</title>
        <meta name="description" content={certificate.description} />
        <meta
          name="keywords"
          content="personal website, web developer, perfusion, student, learning, personal growth, technologies, frameworks, online courses, tutorials"
        />
        <meta property="og:title" content="Mosa Khathur" />
        <meta property="og:description" content={certificate.description} />
        <meta property="og:image" content={certificate.coverImage.asset.url} />
      </Head>

      <div className="w-full h-[30vh] relative">
        {certificate.coverImage && (
          <Image
            className="rounded-xl object-cover bg-zinc-800 z-20"
            src={certificate.coverImage.asset.url}
            fill
            alt={certificate.title}
          />
        )}
        <div className="w-full h-full rounded-xl relative z-30">
          <button
            onClick={toggleZoom}
            className="absolute bottom-4 left-4 px-4 bg-zinc-900 shadow-xl py-2 text-xs font-bold active:scale-95 transition-all active:bg-zinc-800 capitalize rounded"
          >
            Zoom In
          </button>
        </div>

        <button
          onClick={() => router.back()}
          className="absolute hover:scale-110 active:scale-95 scale-1 transition-all top-2 left-2 rounded-xl z-30 bg-zinc-900 bordeer  border-zinc-700 p-2  "
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            height="1em"
            width="1em"
          >
            <polyline points="9 14 4 9 9 4"></polyline>
            <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
          </svg>
        </button>
      </div>
      <div className="date mt-2 text-xs text-zinc-300">{certificate.date}</div>

      <h1 className="mt-3 text-xl font-bold">{certificate.title}</h1>

      <div className="text-zinc-400 flex flex-col mt-5">
        <div className="text-sm">{certificate.subtitle}</div>

        <div className="mt-2">{certificate.description}</div>
      </div>

      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed bg-black/40 inset-0 z-50"
        >
          <div className="zoomedIn fixed   top-20 bottom-20 left-5 right-5 max-w-[30em] mx-auto">
            <Image
              className="rounded-xl object-cover bg-zinc-800 z-20"
              src={certificate.coverImage.asset.url}
              fill
              alt={certificate.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const certificates = await client.fetch(`*[_type == "certificates"]`);
  const paths = certificates.map((certificate) => ({
    params: { slug: certificate.slug.current },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const certificate = await client.fetch(
    `*[_type == "certificates" && slug.current == $slug][0]{
      date
,title
,subtitle
,description,
coverImage{asset->{url}}
    }`,
    { slug: params.slug }
  );
  return {
    props: {
      certificate,
    },
  };
}
