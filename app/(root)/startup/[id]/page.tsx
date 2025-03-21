import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks-new",
    }),
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto max-h-[80vh] rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-7xl mx-auto">
          <div className="flex-between gap-5 flex-nowrap xs:flex-wrap">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-3 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={54}
                height={54}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium !text-white">{post.author.name}</p>
                <p className="text-16-medium !text-white">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <div className="xs:w-fit">
              <p className="category-tag">{post.category}</p>
            </div>
          </div>

          <h3 className="font-semibold text-white text-[22px]">
            Pitch Details
          </h3>
          {parsedContent ? (
            <article
              className="prose prose-invert max-w-7xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider" />

        {/* EDITOR SELECTED STARTUPS */}

        {editorPosts?.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <p className="font-semibold text-white text-[22px]">Editor Picks</p>

            <ul className="mt-7 card_grid">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
