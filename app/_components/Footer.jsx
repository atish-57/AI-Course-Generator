"use client"
import { FaLinkedin, FaGlobe } from "react-icons/fa6";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const Footer = () => {
  const path = usePathname();
  const menu = [
    {id:1,
      name:'About Us',
      path:'/about'
    },
    {id:1,
      name:'Contact Us',
      path:'/contact'
    },
    {id:1,
      name:'Terms & Conditions',
      path:'/terms'
    },
  ]
  return (
   
   

    <footer className=" bottom-0 bg-white dark:bg-gray-900">
  <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
   

    <div
      className="mt-16 border-t border-gray-100 pt-8 sm:flex sm:items-center sm:justify-between lg:mt-24 dark:border-gray-800"
    >
      <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
        {menu.map((item,index) =>(
           <Link href={item.path} key={item.id}>

        <li
          className="text-gray-500 text-xl transition hover:opacity-75 dark:text-gray-400">
            {item.name}
         
        </li>
           </Link>
        
        ))}

        
      </ul>

      <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
        <li>
         
        </li>

        <li>
         
        </li>

        <li>
          <a
            href="https://portfolio-atish-57s-projects.vercel.app/"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700 text-2xl transition hover:opacity-75 dark:text-gray-200"
          >
            <span className="sr-only">Web</span>
            <FaGlobe />
          </a>
        </li>

        <li>
          <a
            href="https://github.com/atish-57"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
          >
            <span className="sr-only">GitHub</span>

            <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>

        <li>
          <a
            href="https://www.linkedin.com/in/atish-ranjan-3bab84251/"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700 text-2xl transition hover:opacity-75 dark:text-gray-200"
          >
            <span className="sr-only">LinkedIn</span>
            <FaLinkedin />
          </a>
        </li>
      </ul>
    </div>
  </div>
</footer>

  )
}

export default Footer