import Image from "next/image";
import Link from "next/link";
import React from "react";
import { client } from "../data";
export default function Index({ featuredCertificate }) {
  console.log(featuredCertificate);
  return (
    <div>
      <section className="md:h-screen mt-20 md:mt-0 flex xl:max-w-[160vmin] max-w-[130vmin]  mx-auto justify-between items-center lg:px-0 px-10 md:flex-row flex-col-reverse">
        <div className="flex flex-col max-w-[35em] gap-3 sm:mr-2">
          <div className="md:text-5xl text-3xl font-extrabold md:text-left text-center capitalize md:mt-0 mt-3">
            welcome to my personal website
          </div>

          <div className="text-zinc-400 md:text-left text-center md:text-lg">
            passionate and inspiring student with a strong dedication to
            learning and personal growth
          </div>

          <div className="flex mt-3 gap-2 md:w-max w-full">
            <Link
              className="bg-blue-600 p-2 rounded active:scale-95 active:bg-blue-700 transition-all px-4 capitalize sm:text-md text-xs flex-1 text-center md:flex-none"
              href="/"
            >
              more about me
            </Link>
            <Link
              href="/"
              className="p-2 px-4 rounded border transition-all text-zinc-400 capitalize sm:text-md text-xs flex-1 text-center md:flex-none border-zinc-700 active:scale-95 "
            >
              my achivments
            </Link>
          </div>
        </div>

        <div className="md:h-[30em] md:w-[30em] w-[10em] h-[10em]">
          <img
            src="/images/me.jpeg"
            className="w-full rounded-full md:rounded-none  h-full object-cover"
            alt=""
          />
        </div>
      </section>
      <section className="py-20 px-[clamp(1em,7vw,10em)] bg-zinc-900/80 border border-zinc-800 items-center mt-20 flex lg:flex-row flex-col gap-10">
        <div className="img h-[25em] w-full lg:min-w-[clamp(2em,50vw,35em)] relative">
          <Image
            src="/images/me.jpeg"
            className="rounded-xl border border-zinc-800 h-full w-full object-cover"
            alt=""
            fill
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="sm:text-3xl text-2xl capitalize font-bold">
            about me
          </div>
          <div className="text-zinc-400">
            As a web developer and student of perfusion, I am always looking for
            ways to expand my knowledge and improve my skills. In my free time,
            I enjoy staying up-to-date with the latest technologies and
            frameworks in web development and often participate in online
            courses and tutorials to learn new skills. I am passionate about
            using my knowledge and expertise to make a positive impact in the
            world, and I am always seeking out new opportunities to challenge
            myself and grow as a professional.
          </div>
          <Link
            className="py-2 px-4 sm:mt-10 mt-6 bg-blue-600 rounded w-max capitalize"
            href="/projects"
          >
            my achivments
          </Link>
        </div>
      </section>
      <section>
        <div className="py-10 mt-20 bg-gradient-to-b from-zinc-900 border-t border-zinc-700 grid md:grid-cols-3 grid-cols-1 xl:gap-20 md:gap-10 gap-20 lg:px-[10em] px-10">
          {[
            {
              head: "Communication Skills",
              subhead:
                "As a web developer and student of perfusion, I am passionate about using my knowledge and skills to make a positive impact in the world. I am driven by my desire to learn and grow, and I am always seeking out new opportunities to expand my horizons and challenge myself.",
            },
            {
              head: "Communication Skills",
              subhead:
                "In my work and studies, I have developed strong communication skills and the ability to effectively convey my ideas and thoughts to others. I am comfortable speaking in front of groups and am able to adapt my style to fit different audiences and situations..",
            },
            {
              head: "Leadership",
              subhead:
                "I have also demonstrated strong leadership skills through my involvement in various community development initiatives. I am able to inspire and motivate others to work towards a common goal, and am able to delegate tasks and responsibilities effectively.",
            },
          ].map((i, index) => (
            <div key={index} className="flex gap-2 flex-col">
              <div className="text-xl font-bold border border-zinc-700 rounded-xl flex items-center justify-center w-10 h-10 ">
                {index + 1}
              </div>
              <div className="text-xl mt-3 font-bold">{i.head}</div>
              <div className="text-zinc-400">{i.subhead} </div>
            </div>
          ))}
        </div>
      </section>

      <section className="lg:px-[5em] md:px-10 px-6 mt-10">
        <div className="text-3xl text-center font-extrabold capitalize">
          Featured certificates
        </div>

        <div className="grid mt-8 sm:gap-10 gap-20 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {featuredCertificate.map((i, index) => (
            <Link
              href={`/${i.certificate.slug.current}`}
              key={index}
              className="flex flex-col active:scale-95 transition-all hover:scale-105"
            >
              <div className="w-full h-[18em] sm:h-[15em] bg-zinc-800 rounded overflow-hidden relative">
                <Image
                  src={i.certificate.coverImage.asset.url}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex capitalize flex-col">
                <div className="text-2xl mt-3 font-extrabold line-clamp-1">
                  {i.certificate.title}
                </div>
                <div className="text-zinc-400 mt-1 ">
                  {i.certificate.subtitle}
                </div>
              </div>
            </Link>
          ))}

          <Link
            href="/certificates"
            className="border text-center active:scale-95 transition-all rounded active:bg-zinc-900 capitalize border-zinc-700 md:col-span-3 sm:col-span-2 col-span-1 sm:w-max mx-auto text-zinc-400 mt-1 w-full sm:text-xl p-2"
          >
            all certificates
          </Link>
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const featuredCertificate = await client.fetch(`
    *[_type == "featuredCertificate"]{
      certificate->{
        title,subtitle,slug,coverImage{asset->{url}} 
      }
    }
  `);
  return {
    props: {
      featuredCertificate,
    },
  };
}
