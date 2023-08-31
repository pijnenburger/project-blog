import { NextResponse } from "next/server";
import RSS from "rss";
import { getBlogPostList } from "@/helpers/file-helpers";
import { BLOG_TITLE, BLOG_DESCRIPTION } from "@/constants";

export async function GET() {
  const feed = new RSS({ title: BLOG_TITLE, description: BLOG_DESCRIPTION });

  const blogPosts = await getBlogPostList();

  blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      date: post.publishedOn,
      url: `http://localhost:3000/${post.slug}`,
    });
  });

  return new NextResponse(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
