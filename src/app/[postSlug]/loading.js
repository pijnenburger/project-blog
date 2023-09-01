import Spinner from "@/components/Spinner/Spinner";
import React from "react";

async function BlogPostLoading() {
  return (
    <div
      style={{
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner />
    </div>
  );
}

export default BlogPostLoading;
