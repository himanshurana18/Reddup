// import Post from "@/components/post/Post";
// import { urlFor } from "@/sanity/lib/image";
// import { getPostsForSubreddit } from "@/sanity/lib/subreddit/getPostsForSubreddit";
// import { getSubredditBySlug } from "@/sanity/lib/subreddit/getSubredditBySlug";
// import { currentUser } from "@clerk/nextjs/server";
// import Image from "next/image";

// async function CommunityPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;

//   const community = await getSubredditBySlug(slug);
//   if (!community) return null;

//   const user = await currentUser();
//   const posts = await getPostsForSubreddit(community._id);

//   return (
//     <>
//       {/* Community Banner */}
//       <section className="bg-white border-b">
//         <div className="mx-auto max-w-7xl px-4 py-6">
//           <div className="flex items-center gap-4">
//             {community?.image && community.image.asset?._ref && (
//               <div className="relative h-16 w-16 overflow-hidden rounded-full border">
//                 <Image
//                   src={urlFor(community.image).url()}
//                   alt={
//                     community.image.alt || `${community.title} community icon`
//                   }
//                   fill
//                   className="object-contain"
//                   priority
//                 />
//               </div>
//             )}
//             <div>
//               <h1 className="text-2xl font-bold">{community?.title}</h1>
//               {community?.description && (
//                 <p className="text-sm text-gray-600">{community.description}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Posts */}
//       <section className="my-8">
//         <div className="mx-auto max-w-7xl px-4">
//           <div className="flex flex-col gap-4">
//             {posts.length > 0 ? (
//               posts.map((post) => (
//                 <Post key={post._id} post={post} userId={user?.id || null} />
//               ))
//             ) : (
//               <div className="bg-white rounded-md p-6 text-center">
//                 <p className="text-gray-500">No posts in this community yet.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default CommunityPage;
import Post from "@/components/post/Post";
import { urlFor } from "@/sanity/lib/image";
import { getPostsForSubreddit } from "@/sanity/lib/subreddit/getPostsForSubreddit";
import { getSubredditBySlug } from "@/sanity/lib/subreddit/getSubredditBySlug";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import type { FC } from "react";

// Define the shape of the Author data
interface AuthorType {
  _id: string;
  _type: "user";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  username?: string;
  image?: {
    asset?: {
      _ref: string;
    };
    alt?: string;
  };
  isReported?: boolean;
}

// Define the shape of the Block Content (for body)
interface BlockContent {
  _key: string;
  _type: string;
  style?:
    | "normal"
    | "blockquote"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "bullet"
    | "number";
  children?: Array<{
    _key: string;
    _type: "span";
    text?: string;
    marks?: string[];
  }>;
}

// Define the shape of the Post data
interface PostType {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  originalTitle?: string;
  author: AuthorType | null;
  slug?: {
    current?: string;
  } | null;
  body?: BlockContent[] | null;
  image?: {
    asset?: {
      _ref: string;
    };
    alt?: string;
  };
  isDeleted?: boolean;
  commentCount: number;
}

// Define the shape of the Community data
interface CommunityType {
  _id: string;
  title: string;
  description?: string;
  image?: {
    asset?: {
      _ref: string;
    };
    alt?: string;
  };
}

// Define the shape of the params prop
interface CommunityPageProps {
  params: Promise<{ slug: string }>;
}

// Use FC (Function Component) type for better TypeScript support
const CommunityPage: FC<CommunityPageProps> = async ({ params }) => {
  const { slug } = await params;

  const community: CommunityType | null = await getSubredditBySlug(slug);
  if (!community) {
    return null;
  }

  const user = await currentUser();
  const posts: PostType[] = await getPostsForSubreddit(community._id);

  return (
    <>
      {/* Community Banner */}
      <section className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center gap-4">
            {community.image?.asset?._ref && (
              <div className="relative h-16 w-16 overflow-hidden rounded-full border">
                <Image
                  src={urlFor(community.image).url()}
                  alt={
                    community.image.alt ?? `${community.title} community icon`
                  }
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">{community.title}</h1>
              {community.description && (
                <p className="text-sm text-gray-600">{community.description}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="my-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4">
            {posts.length > 0 ? (
              posts.map((post: PostType) => (
                <Post key={post._id} post={post} userId={user?.id ?? null} />
              ))
            ) : (
              <div className="bg-white rounded-md p-6 text-center">
                <p className="text-gray-500">No posts in this community yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CommunityPage;
