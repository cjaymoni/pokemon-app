import axios from "axios";
import Swal from "sweetalert2";

const url = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: url,
  //   baseURL: "https://pokeapi.co/api/v2",
  timeout: 5000,
});

api.defaults.headers.get["Accept"] = "application/json";
api.defaults.headers.post["Content-Type"] = "application/json";

api.interceptors.request.use(
  function (config) {
    Swal.fire({
      title: '<i class="pi  pi-spin pi-spinner" ></i><br>Loading',
      text: "please wait",
      // iconHtml:'<i class="pi  pi-spin pi-spinner"></i>',
      // iconColor:'blue',
      showConfirmButton: false,
    });
    return config;
  },
  function (error) {
    Swal.fire({
      title: JSON.stringify(error),
      icon: "error",
      html: "<div>An Error Occurred<br/> Rest Assured It will be fixed</div>",
      showConfirmButton: false,
      timer: 2000,
    });
    return Promise.reject(error);
  }
);

//response interceptor to handle errors
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    Swal.close();

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    var originalRequest = error.config;
    if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return (
        axios.request(originalRequest),
        Swal.fire({
          title: "Request timeout",
          html: "<div>Try Again </div>",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        })
      );
    } else {
      Swal.fire({
        title: JSON.stringify(error),
        icon: "error",
        html: "<div>An Error Occurred<br/> Rest Assured It will be fixed</div>",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
