import React, { useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'


import 'react-toastify/dist/ReactToastify.css';

const ErrorMsg = ({showToast, msg, type}) => {
    const notify = ()=>  toast[type](msg,
        {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce
        }
    )
    

    useEffect(() => {
        if (showToast) {
            notify()
        }
    },[showToast])

  return (
    <ToastContainer/>
  )
}

export default ErrorMsg
