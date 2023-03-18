import { type NextPage } from "next";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { api } from "~/utils/api";

const PagesDash: NextPage = () => {
  const submitPages = api.pagesDash.createPage.useMutation();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");

  const handlePageSubmt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) return;
    submitPages
      .mutateAsync({
        title: title,
      })
      .catch(console.error);
      setShowForm(false)
  };

  return (
    <div>
      <div>
        <h1>Pages</h1>
      </div>
      <div>
        <button onClick={() => setShowForm(true)}>Add New Page</button>
      </div>
      {showForm && (
        <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-75">
          <form
            onSubmit={handlePageSubmt}
            className="rounded-lg bg-white p-8 shadow-lg"
          >
            <div className="flex flex-row justify-between">
              <h2 className="mb-4 text-lg font-bold">Add New Page</h2>
              <AiOutlineClose
                className=" cursor-pointer"
                size={20}
                onClick={() => setShowForm(false)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="title"
                className="mb-2 block font-bold text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border px-4 py-2"
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              >
                Add Page
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PagesDash;
