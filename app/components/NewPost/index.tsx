"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { CldUploadWidget } from "next-cloudinary";

type Inputs = {
  title: string;
  author: string;
  profile: string;
  content: string;
};

type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

export const NewPost = ({ activeNewPost }: any) => {
  const [image, setImage] = useState("");
  const date = () => new Date().toDateString();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({
    title,
    author,
    profile,
    content,
  }) => {
    const imageUrl = image;
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, author, profile, content, imageUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      activeNewPost()
    } else {
      console.error("Erro ao salvar a postagem.");
    }
  };

  return (
    <>
      <main className="mx-auto w-3/5 min-h-max">
        <div className="bg-neutral-900 px-8 py-8 rounded-2xl">
          <div className="flex justify-between">
            <div>
              <span className="text-gray-500">{date()}</span>
            </div>
          </div>
          <br />
          <div className="flex flex-col justify-center h-content border border-zinc-800 rounded-mdd px-10">
            <div className="mb-8 pt-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex mb-8 w-full justify-between">
                  <div className="mb-4 text-sm font-bold w-[48%]">
                    <label>Nome</label>
                    <input
                      {...register("author")}
                      className="mt-2 placeholder:italic placeholder:text-slate-400 block bg-neutral-900 w-full border border-neutral-800 rounded-md px-4 py-2 pr-3 shadow-sm focus:outline-none focus:border-neutral-500 focus:ring-neutral-500 focus:ring-1 sm:text-md"
                      placeholder="Fulano da Silva"
                      type="text"
                    />
                  </div>
                  <div className="mb-4 text-sm font-bold w-[48%]">
                    <label>Cargo</label>
                    <input
                      {...register("profile")}
                      className="mt-2 placeholder:italic placeholder:text-slate-400 block bg-neutral-900 w-full border border-neutral-800 rounded-md px-4 py-2 pr-3 shadow-sm focus:outline-none focus:border-neutral-500 focus:ring-neutral-500 focus:ring-1 sm:text-md"
                      placeholder="Coach do Elon Musk"
                      type="text"
                    />
                  </div>
                </div>

                <div className="mb-4 mt-20 text-4xl	font-bold ">
                  <input
                    {...register("title")}
                    className="placeholder:italic  text-center placeholder:text-slate-400 block bg-neutral-900 w-full border border-neutral-900 rounded-md px-4 py-2 pr-3 shadow-sm focus:outline-none focus:border-neutral-500 focus:ring-neutral-500 focus:ring-1 sm:text-md"
                    placeholder="Titulo..."
                    type="text"
                  />
                </div>
                <p className="mb-4 text-gray-300 text-md mt-8">
                  <textarea
                    {...register("content")}
                    className="placeholder:italic placeholder:text-slate-400 block bg-neutral-900 w-full border border-neutral-800 rounded-md py-2 px-4 pr-3 h-24 shadow-sm focus:outline-none focus:border-neutral-500 focus:ring-neutral-500 focus:ring-1 sm:text-md"
                    placeholder="Conteúdo"
                  />
                </p>
                <div className="flex justify-center">
                  <CldUploadWidget
                    onUpload={(result: UploadResult) => {
                      setImage(result.info.public_id);
                    }}
                    uploadPreset="zvadtlxq"
                  >
                    {({ open }) => {
                      function handleOnClick(e) {
                        e.preventDefault();
                        open();
                      }
                      return (
                        <button
                          className="bg-green-900  hover:bg-green-600  px-8 py-2 rounded-md"
                          type="submit"
                          onClick={handleOnClick}
                        >
                          <span className="font-bold"> Carregar Imagem</span>
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                </div>
                <div className="flex justify-center mt-8">
                  {image && (
                    <CldImage
                      width="960"
                      height="600"
                      src={image}
                      sizes="100vw"
                      alt="Description of my image"
                    />
                  )}
                </div>
                <div className="py-8  flex justify-end">
                  <button
                    className=" hover:bg-gray-600  px-8 py-2 rounded-md mr-4"
                    type="button"
                    onClick={activeNewPost}
                  >
                    <span className="font-bold">Cancelar</span>
                  </button>
                  <button
                    className="bg-green-900 hover:bg-green-600  px-8 py-2 rounded-md"
                    type="submit">
                    <span className="font-bold">Criar Post</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="flex mx-auto gap-x-6">
              <div className="mb-8 border border-gray-600 " />
              <div className="mb-8 border border-gray-600 " />
              <div className="mb-8 border border-gray-600 " />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
