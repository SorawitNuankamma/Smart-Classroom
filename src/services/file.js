const postFile = async (data) => {
  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/files/`,
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }
  );
  return response.json(); // parses JSON response into native JavaScript objects
};

const getFiles = async (filterObj) => {
  let searchParams = new URLSearchParams(filterObj);
  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/files?${searchParams.toString()}`,
    {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.json(); // parses JSON response into native JavaScript objects
};

const patchFile = async (data, id) => {
  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/files/${id}`,
    {
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }
  );
  return response.json(); // parses JSON response into native JavaScript objects
};

export { postFile, getFiles, patchFile };
