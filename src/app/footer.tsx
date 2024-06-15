import { XIcon, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link
              href="https://studio.fizzdragon.com/"
              className="flex items-center"
            >
              <span className="hidden md:block self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                OnePersonStudio.com
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <Link
                  href="https://studio.fizzdragon.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Gradient Tool
                </Link>
              </ul>

              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <Link
                  href="https://studio.fizzdragon.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Looking for Investors
                </Link>
              </ul>

              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <Link
                  href="https://studio.fizzdragon.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Seeking Partners
                </Link>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow me
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium flex flex-col gap-4">
                <Link
                  href="https://fizzdragon.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                >
                  <XIcon /> @FizzDragon
                </Link>

                <Link
                  href="https://blog.fizzdragon.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                >
                  <Youtube /> @FizzDragon
                </Link>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium flex flex-col gap-4">
                <li>
                  <Link href="/privacy-policy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a
              href="https://studio.fizzdragon.com/"
              className="hover:underline"
            >
              OnePersonStudio.com
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
