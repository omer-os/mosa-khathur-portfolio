import { useRouter } from "next/router";

export default function BlogDetailPage({ blog }) {
  const router = useRouter();
  return (
    <div className="lg:w-4/6 relative sm:w-5/6  mx-auto mt-[6em] px-6">
      <div className="w-full h-[30vh] relative">
        {/* <Image
          className="rounded-xl object-cover bg-zinc-800"
          src={blog.mainImage.asset.url}
          fill
          alt={blog.title}
        /> */}
        <div className="bg-zinc-800 w-full h-full rounded-xl relative">
          <button className="absolute bottom-4 left-4 px-4 bg-zinc-700 shadow-xl py-2 text-sm font-bold active:scale-95 transition-all active:bg-zinc-600 capitalize rounded">
            Zoom In
          </button>
        </div>

        <button
          onClick={() => router.back()}
          className="absolute hover:scale-110 active:scale-95 scale-1 transition-all top-2 left-2 rounded-xl z-20 bg-zinc-900 bordeer  border-zinc-700 p-2 "
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLnecap="round"
            strokeLinejoin="round"
            class="h-6 w-6"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="9 14 4 9 9 4"></polyline>
            <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
          </svg>
        </button>
      </div>
      <div className="date mt-2 text-xs text-zinc-300">
        {/* {new Date(blog.publishedAt).toDateString()} */}
        Date: 20201/203./2
      </div>

      <h1 className="mt-3 text-2xl font-bold">
        {/* {blog.title} */}
        title
      </h1>

      <article className="text-zinc-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, magni.
        lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos cum
        facilis aliquam saepe id consectetur similique dolorum? Harum
        consequatur animi, natus ipsum quaerat similique nam pariatur suscipit
        corrupti adipisci alias.
      </article>
    </div>
  );
}
