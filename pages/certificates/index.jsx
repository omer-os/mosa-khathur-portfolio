import Link from "next/link";
import React from "react";
import { client } from "../../data";
import Image from "next/image";

export default function Index({ certificates }) {
  console.log(certificates);
  return (
    <div className="">
      <div className="flex max-w-[25em] mx-auto px-2 flex-col">
        <div className="text-4xl mt-20 text-center  font-bold ">
          My Certificates
        </div>
        <div className="mt-2 text-center text-zinc-500">
          Proud of my certificates and the skills they represent. Reflect my
          dedication to growth and learning.{" "}
        </div>
      </div>

      <div className="mt-10 sm:px-10 px-5 grid lg:grid-cols-3 sm:grid-cols-2 gap-10 grid-cols-1 w-full">
        {certificates.map((i, index) => (
          <Link
            href={`/certificates/${i.slug.current}`}
            key={index}
            className="flex flex-col active:scale-95 transition-all hover:sm:scale-105"
          >
            <div className="w-full h-[18em] sm:h-[15em] bg-zinc-800 rounded overflow-hidden relative">
              <Image
                src={i.coverImage.asset.url}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex capitalize flex-col">
              <div className="text-2xl mt-3 font-extrabold line-clamp-1">
                {i.title}
              </div>
              <div className="text-zinc-400 mt-1 line-clamp-1 ">
                {i.subtitle}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const certificates = await client.fetch(`
    *[_type == "certificates"]{
      title, slug,coverImage,subtitle,coverImage{asset->{url}}    
    }
  `);
  return {
    props: {
      certificates,
    },
  };
}
