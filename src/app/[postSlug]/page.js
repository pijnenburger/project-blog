import React from "react";
//external imports
import { MDXRemote } from "next-mdx-remote/rsc";
//Constants & helpers
import { BLOG_TITLE } from "@/constants";
import { loadBlogPost } from "@/helpers/file-helpers";
import COMPONENT_MAP from "@/helpers/mdx-components";
//Components
import BlogHero from "@/components/BlogHero";
//Styles
import styles from "./postSlug.module.css";

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);

  return {
    title: `${frontmatter.title} · ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

const components = COMPONENT_MAP;

async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={components} />
      </div>
    </article>
  );
}

export default BlogPost;
