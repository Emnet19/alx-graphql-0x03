// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function Home() {
//   return (
//     <div
//       className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
//     >
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               pages/index.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>
//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org â†’
//         </a>
//       </footer>
//     </div>
//   );
// }


import { useQuery } from "@apollo/client/react"
import { GET_EPISODES } from "@/graphql/queries"
import { EpisodeProps } from "@/interfaces"
import EpisodeCard from "@/components/common/EpisodeCard"
import { useEffect, useState } from "react"
import ErrorBoundary from "@/components/ErrorBoundary"
import ErrorProneComponent from "@/components/ErrorProneComponent"


const Home: React.FC = () => {

  const [page, setPage] = useState<number>(1)
  const { loading, error, data, refetch } = useQuery(GET_EPISODES, {
    variables: {
      page: page
    }
  })

  useEffect(() => {
    refetch()
  }, [page, refetch])

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error</h1>

const results = data?.episodes?.results || []
const info = data?.episodes?.info || {}
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#F4F4F4] text-gray-800">
      {/* Header */}
      <header className="bg-[#4CA1AF] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold tracking-wide">Rick and Morty Episodes</h1>
        <p className="mt-2 text-lg italic">Explore the multiverse of adventures!</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results && results.map(({ id, name, air_date, episode }: EpisodeProps, key: number) => (
            <EpisodeCard
              id={id}
              name={name}
              air_date={air_date}
              episode={episode}
              key={key}
            />
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-6">
          <button 
            onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105">
            Previous
          </button>
          <button 
            onClick={() => setPage(prev => prev < info.pages ? prev + 1 : prev)}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105">
            Next
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#4CA1AF] text-white py-4 text-center shadow-md">
        <p>&copy; 2024 Rick and Morty Fan Page</p>
      </footer>
    </div>
  )
}

export default Home
