import React, { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function home() {
  const [Id, SetId] = useState("");
  const [ Count , SetCount ] = useState(0);

  const fetchUsers = async () => {
    try {
      if (Id !== null && Id !== "") {
        const res = await axios.get(`https://dummyjson.com/users/${Id}`);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 404") {
        toast.error('🦄 لطفا آیدی را بیشتر از 0 قرار دهید!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
      console.clear();
    }
  };

  useEffect(() => {
    
    const Interval = setInterval(() => {
      SetCount( Count => Count + 1 )
    }, 500)

    return () => clearInterval(Interval)

  })

  return (
    <div className="home">
      <ToastContainer />

      <input
        type="text"
        value={Id}
        onInput={(event) => SetId(event.target.value)}
      />
      <button onClick={fetchUsers}> show users </button>

      counter {Count}

    </div>
  );
}

export default home;
