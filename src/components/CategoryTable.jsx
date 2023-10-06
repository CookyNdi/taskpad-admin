import Swal from "sweetalert2";
import { categoryDataById, deleteCategory, updateCategory } from "../libs/apiHandler";

/* eslint-disable react/prop-types */
const CategoryTable = ({ datas, loading, setAction }) => {
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id);
        setAction(true);
      }
    });
  };
  const handleUpdate = async (id) => {
    const categoryById = await categoryDataById(id);
    const { isConfirmed } = await Swal.fire({
      title: "Add Category",
      html: `
      <div>
        <div class="flex w-full items-center">
          <label for="swal-input1">Title:</label>
          <input id="swal-input1" class="swal2-input" value="${categoryById.title}">
        </div>
        <div class="flex w-full items-center">
          <label for="swal-input2">Color:</label>
          <input style="width: 55%;" id="swal-input2" class="swal2-input" value="${categoryById.color}" type="color">
        </div>
      </div>
    `,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Update",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          return await updateCategory(id);
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error.message}`);
          return null;
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
    if (isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Successfully",
        text: "Category Updated Successfully",
      }).then((result) => {
        if (result.isConfirmed) {
          setAction(true);
        }
      });
    }
  };
  if (loading) {
    return <div className="mx-2 font-medium text-lg text-gray-900 dark:text-white text-center">Loading...</div>;
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                name
                <a href="#">
                  <svg
                    className="w-3 h-3 ml-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                color
                <a href="#">
                  <svg
                    className="w-3 h-3 ml-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
              </div>
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
          {datas.map((data, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={data.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </th>
              <td className="px-6 py-4">{data.title}</td>
              <td className="px-6 py-4">{data.color}</td>
              <td
                onClick={() => handleUpdate(data.id)}
                className="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
              >
                Edit
              </td>
              <td
                onClick={() => handleDelete(data.id)}
                className="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
