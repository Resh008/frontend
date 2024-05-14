import React from 'react'
import { backend_url } from '../../server'

const Hero = () => {
  return (
    <div>
          <div class="bg-white">
        <div class="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
            <div class="mr-auto place-self-center lg:col-span-7">
                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">Almadi <br/> Online Shopping Nepal</h1>
                <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl0">This is the one of the   <a href="https://tailwindcss.com" class="hover:underline">Best</a> ecommerce platform<a href="https://flowbite.com/blocks/" class="hover:underline">in Nepal</a>.</p>
                <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">

                </div>
            </div>
            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src={`${backend_url}hero.png`} alt="hero image"/>
            </div>                
        </div>
    </div>
    </div>
  )
}

export default Hero