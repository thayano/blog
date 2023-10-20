"use client";

import { Post } from "@/app/components/Post";
import { NewPost } from "@/app/components/NewPost";
import { useState } from "react";

export const Main = () => {
  const [exib, setExib] = useState(true);

  const activeNewPost = () => (
    setExib(!exib)
  )
  return (
    <>
      {exib == true ? (
        <Post activeNewPost={activeNewPost} />
      ):
      (<NewPost activeNewPost={activeNewPost}/>)}
    </>
  );
};
