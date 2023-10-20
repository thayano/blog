import Image from 'next/image'
import { Header } from './components/Header'
import { Main } from './components/Main'
  
import { redirect } from 'next/navigation';
import { v2 as cloudinary } from 'cloudinary';

// import CldImage from '@/app/components/CldImage';

cloudinary.config({
  cloud_name: process.env.CLOUND_NAME,
  api_key: process.env.CLOUND_API_KEY,
  api_secret: process.env.CLOUND_API_SECRET,
})


export default async function Home() {
  function Footer() {
    return (
      <footer className="text-white p-4">
        Seu conteúdo de rodapé aqui.
      </footer>
    );
  }
  return (<>
   <div className='w-full flex flex-col h-screen'>
      <Header/>
      <Main/>
    </div>
  </>
  )
}
