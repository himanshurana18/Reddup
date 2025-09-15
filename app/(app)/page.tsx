// import PostsList from "@/components/post/PostsList";

// export default function Home() {
//   return (
//     <>
//       {/* Banner */}
//       <section className="bg-white border-b">
//         <div className="mx-auto max-w-7xl px-4 py-6">
//           <div className="flex items-center">
//             <div>
//               <h1 className="text-2xl font-bold">Home</h1>
//               <p className="text-sm text-gray-600">
//                 Recent posts from all communities
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Posts */}
//       <section className="my-8">
//         <div className="mx-auto max-w-7xl px-4">
//           <div className="flex flex-col gap-4">
//             <PostsList />
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
interface Subreddit {
  _id: string;
  name: string;
  slug: string;
  // agar aur fields hain to yaha add kar lo
}

export default function SearchPage() {
  const subreddits: Subreddit[] = [
    // yaha tum apne actual fetched data assign karoge
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 my-8">
      <ul className="flex flex-col gap-4">
        {subreddits.map((subreddit: Subreddit) => (
          <li
            key={subreddit._id}
            className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold">{subreddit.name}</h2>
              <p className="text-sm text-gray-600">/{subreddit.slug}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
