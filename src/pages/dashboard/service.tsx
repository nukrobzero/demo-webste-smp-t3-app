import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import FormDashbord from "~/components/dashboard/form-template";

import { api } from "~/utils/api";

const PagesDash: NextPage = () => {
  const showPageData = api.pagesDash.getAllPage.useQuery();
  const submitPages = api.pagesDash.createPage.useMutation();
  const deletePage = api.pagesDash.deletePage.useMutation();
  const updatePage = api.pagesDash.updatePage.useMutation();

  const page = showPageData.data;

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [checkEdit, setCheckEdit] = useState(0);
  const [values, setValues] = useState({ id: "", title: "" });

  const handleChange = (event: React.ChangeEvent) => {
    if (checkEdit === 1) {
      const { name, value }: any = event.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handlePageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) return;
    submitPages
      .mutateAsync({
        title: title,
      })
      .then(() => {
        setShowForm(false);
        setTitle("");
        showPageData.refetch();
      })
      .catch(console.error);
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePage
      .mutateAsync({
        id: values.id,
        title: values.title,
      })
      .then(() => {
        setShowForm(false);
        setCheckEdit(0);
        showPageData.refetch();
      })
      .catch(console.error);
  };

  const handleDelete = (id: string) => {
    deletePage
      .mutateAsync({
        id,
      })
      .then(() => {
        showPageData.refetch();
      })
      .catch(console.error);
  };

  return (
    <div>
      <div>
        <h1>Service</h1>
        <div className="flex h-full w-full items-center justify-center">
          <table className=" w-[800px] text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {page?.map((data: any) => (
                <tr
                  key={data.id}
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    <Link href={`/dashboard/service/${data.title}`}>
                      {data.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setShowForm(true), setValues(data), setCheckEdit(1);
                      }}
                      className="font-medium text-green-600 hover:underline dark:text-green-500"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <button
          onClick={() => setShowForm(true)}
          className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add New Page
        </button>
      </div>
      {showForm && (
        <FormDashbord
          id="title"
          name="title"
          value={checkEdit === 1 ? values.title : title}
          onClick={() => {
            setShowForm(false),
              setCheckEdit(0),
              setValues({ id: "", title: "" });
          }}
          onSubmit={checkEdit === 1 ? handleUpdate : handlePageSubmit}
          onChange={
            checkEdit === 1
              ? handleChange
              : (e: any) => setTitle(e.target.value)
          }
          btnName={checkEdit === 1 ? "Update" : "Add"}
          titleName={checkEdit === 1 ? "Update Page" : "Create Page"}
        />
      )}
      ;
    </div>
  );
};

export default PagesDash;
