/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CategoryTable from "./components/CategoryTable";
import StatusTable from "./components/StatusTable";
import { handleAddCategory, handleAddStatus, handleLogin } from "./libs/ModalInput";
import { handleChangeTableName, handleLogout } from "./libs/utils";
import Cookies from "js-cookie";
import { categoryDatas, statusDatas, tokenRefresher } from "./libs/apiHandler";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [action, setAction] = useState(false);
  const [tableName, setTableName] = useState("Categories");
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    if (Cookies.get("refresh_token")) {
      tokenRefresher();
      setIsLogin(true);
    }
  }, [action]);
  useEffect(() => {
    const handleGetData = async () => {
      try {
        setLoading(true);
        if (tableName === "Categories" && Cookies.get("access_token")) {
          setDatas(await categoryDatas());
        } else if (tableName === "Status") {
          setDatas(await statusDatas());
        }
      } catch (error) {
        console.log("Error fetching data.");
      } finally {
        setLoading(false);
        setAction(false);
      }
    };
    handleGetData();
  }, [tableName, isLogin, action]);
  return (
    <>
      {isLogin ? (
        <div className="relative min-h-screen pb-20 w-full px-5 dark:bg-slate-900 bg-slate-200">
          <div className="w-full py-2 flex justify-end">
            <h1
              onClick={() => handleLogout(setIsLogin)}
              className="mx-2 font-medium rounded-lg text-lg text-gray-900 dark:text-white cursor-pointer"
            >
              Logout
            </h1>
          </div>
          <div className="w-full h-auto py-4 flex justify-between items-center">
            <div className="flex">
              <h1
                onClick={() => handleChangeTableName("Categories", setTableName)}
                className={
                  tableName === "Categories"
                    ? `mx-2 font-medium underline rounded-lg text-lg text-gray-900 dark:text-white cursor-pointer`
                    : `mx-2 font-medium rounded-lg text-lg text-gray-900 dark:text-white cursor-pointer`
                }
              >
                Categories
              </h1>
              <h1
                onClick={() => handleChangeTableName("Status", setTableName)}
                className={
                  tableName === "Status"
                    ? `mx-2 font-medium underline rounded-lg text-lg text-gray-900 dark:text-white cursor-pointer`
                    : `mx-2 font-medium rounded-lg text-lg text-gray-900 dark:text-white cursor-pointer`
                }
              >
                Status
              </h1>
            </div>
            <button
              onClick={() => (tableName === "Categories" ? handleAddCategory(setAction) : handleAddStatus(setAction))}
              type="button"
              className="py-2 px-8 font-medium rounded-lg text-lg text-white bg-purple-700 border border-transparent enabled:hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:enabled:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Add
            </button>
          </div>
          {tableName === "Categories" ? (
            <CategoryTable datas={datas} loading={loading} setAction={setAction} />
          ) : (
            <StatusTable datas={datas} loading={loading} setAction={setAction} />
          )}
        </div>
      ) : (
        <div className="relative h-screen w-screen px-5 dark:bg-slate-900 bg-slate-200">
          <div className="w-full h-full py-2 flex justify-center items-center">
            <h1
              onClick={() => handleLogin(setIsLogin)}
              title="Click To Login"
              className="mx-2 font-medium underline rounded-lg text-5xl text-gray-900 dark:text-white cursor-pointer"
            >
              Login
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
