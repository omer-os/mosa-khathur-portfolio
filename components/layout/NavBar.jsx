import Link from "next/link";
import { useEffect, useRef, useState } from "react";
export default function NavBar() {
  const [MenuOpened, setMenuOpened] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    {
      name: "home",
      url: "/",
    },
    // {
    //   name: "about",
    //   url: "/about",
    // },
    // {
    //   name: "blog",
    //   url: "/blog",
    // },
    {
      name: "certificates",
      url: "/certificates",
    },
    // {
    //   name: "contact",
    //   url: "/contact",
    // },
  ];

  return (
    <>
      <div
        className={`z-40 w-full flex items-center justify-between backdrop-blur-lg bg-black/40 fixed top-0 left-0 py-4 lg:px-[9em] sm:px-[5em] px-6 lb-animate border-zinc-800 md:px-[3em] transition-all ${
          scrollPosition > 0 ? "border-b" : ""
        } `}
      >
        <Link href="/" className="font-bold text-xl">
          Mosa khadur
        </Link>

        <div className="md:flex items-center hidden gap-5 capitalize">
          {links.map((item, index) => (
            <Link
              onClick={() => setMenuOpened(false)}
              href={item.url}
              key={index}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div
          className="lb-menu-btn md:hidden flex"
          onClick={() => setMenuOpened(!MenuOpened)}
        >
          <div
            className={`lb-menu-line ${MenuOpened && "lb-menu-line-1"}`}
          ></div>
          <div
            className={`lb-menu-line ${MenuOpened && "lb-menu-line-2"}`}
          ></div>
          <div
            className={`lb-menu-line ${MenuOpened && "lb-menu-line-3"}`}
          ></div>
        </div>
      </div>

      <div
        className={`flex md:hidden fixed top-0 p-2 text-center z-50 bottom-0 bg-zinc-900 justify-center w-4/6 items-center left-0 lb-animate ${
          MenuOpened ? "" : "-left-[100vh]"
        }`}
      >
        <div
          className={`
        flex gap-4 capitalize text-xl 
        flex-col        `}
        >
          {links.map((item, index) => (
            <Link
              onClick={() => setMenuOpened(false)}
              href={item.url}
              key={index}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`top-0 md:hidden bottom-0 w-0 bg-black/50 fixed z-40 lb-animate duration-200 ${
          MenuOpened ? "w-screen" : ""
        } `}
        onClick={() => setMenuOpened(false)}
      />
    </>
  );
}
