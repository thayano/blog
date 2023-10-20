"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";

export const Post = ({ activeNewPost }: any) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    requestPosts();
  }, []);

  async function requestPosts() {
    const response = await axios.get("/api/posts/");
    const reversedPosts = response.data.reverse();
    setPosts(reversedPosts);
  }

  const updateLike = async (postId, likeCount) => {
    const like = Number(likeCount) + 1;
    try {
      const response = await axios.put("/api/posts", {
        serial: postId,
        like,
      });
    } catch (error) {
      console.error("Erro ao atualizar os likes:", error);
    }
  };

  const updateDislike = async (postId, likeCount) => {
    const like = Number(likeCount) + 1;
    try {
      const response = await axios.put("/api/posts", {
        serial: postId,
        like,
      });
    } catch (error) {
      console.error("Erro ao atualizar os dislikes:", error);
    }
  };

  return (
    <main className="mx-auto w-3/5 min-h-max mb-8">
      <div className="py-8  flex justify-end">
        <button
          className="bg-green-900 hover:bg-green-600 px-8 py-2 rounded-md"
          type="button"
          onClick={activeNewPost}
        >
          <span className="font-bold">Criar Post</span>
        </button>
      </div>
      {posts.map((item: any) => (
        <div className="bg-neutral-900 px-8 py-8 rounded-2xl mb-8 w-[50rem] mx-auto">
          <div className="flex justify-between">
            <div className="flex gap-x-4">
              <div className="w-14 h-14 bg-neutral-900 border rounded-md"></div>
              <div className="">
                <span>{item.author}</span>
                <div className="text-xs mt-1">
                  <span className="text-gray-500">{item.profile}</span>
                </div>
              </div>
            </div>
            <div>
              <span className="text-gray-500">{item.createdAt}</span>
            </div>
          </div>
          <br />
          <div className="flex flex-col justify-center h-content border border-zinc-800 rounded-mdd px-10">
            <div className="mb-8 pt-8">
              <p className="mb-4 text-2xl	font-bold ">{item.title}</p>
              <p className="mb-8 text-gray-300 text-sm">{item.content}</p>
              <div className="flex justify-center">
                {item.imageUrl && (
                  <CldImage
                    width="700"
                    height="300"
                    src={item.imageUrl}
                    sizes="100vw"
                    alt="Description of my image"
                  />
                )}
              </div>
            </div>
            <div className="flex mx-auto gap-x-6">
              <div className="mb-8 border border-gray-600 " />
              <div className="mb-8 border border-gray-600 " />
              <div className="mb-8 border border-gray-600 " />
            </div>
          </div>
          <div className="mt-8 text-gray-500 flex">
            <div>
              <button 
                className="flex gap-2 items-center hover:text-green-500 hover:bg-neutral-800 ms-6 px-2 rounded-md"
                type="button"
                value={item.likes}
                onClick={() => updateLike(item.serial, item.likes)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                  fill="white">
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                {item.likes}
              </button>
            </div>
            <div className="">
              <button 
                className="flex gap-2 items-center hover:text-red-500 hover:bg-neutral-800 ms-6 px-2 rounded-md"
                type="button"
                value={item.dislikes}
                onClick={() => updateDislike(item.serial, item.dislikes)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                  fill="white">
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
                {item.dislikes}
              </button>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};
