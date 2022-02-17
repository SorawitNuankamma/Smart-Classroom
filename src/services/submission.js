const postSubmission = async (data) => {
  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/submissions/`,
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

const patchSubmission = async (data, id) => {
  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/submissions/${id}`,
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

const getMySubmission = async (data) => {
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/submissions/getMySubmission`,
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

const getSubmissions = async (filterObj) => {
  let searchParams = new URLSearchParams(filterObj);

  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/submissions?${searchParams.toString()}`,
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

const getSubmissionsAndFile = async (filterObj) => {
  let searchParams = new URLSearchParams(filterObj);

  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/submissions/getSubmissionsAndFile?${searchParams.toString()}`,
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

export {
  postSubmission,
  patchSubmission,
  getMySubmission,
  getSubmissions,
  getSubmissionsAndFile,
};
