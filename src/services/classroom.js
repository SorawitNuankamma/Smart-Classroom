const postClassroom = async (data) => {
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/classrooms/`,
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

const patchClassroom = async (data, id) => {
  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/classrooms/${id}`,
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

const joinClassroom = async (data) => {
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/classrooms/joinClassroom`,
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

const getClassroom = async (id) => {
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/classrooms/${id}`,
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

const getClassrooms = async (filterObj) => {
  let searchParams = new URLSearchParams(filterObj);

  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/classrooms?${searchParams.toString()}`,
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

const getMyClassrooms = async () => {
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/classrooms/getMyClassroom`,
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

const getMemberInfo = async (filterObj) => {
  let searchParams = new URLSearchParams(filterObj);

  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/classrooms/getMemberInfo?${searchParams.toString()}`,
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

const getAllMembersAndSubmissions = async (filterObj) => {
  console.log(filterObj);
  let searchParams = new URLSearchParams(filterObj);

  console.log(searchParams.toString());
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/classrooms/getAllMembersAndSubmissions?${searchParams.toString()}`,
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
  postClassroom,
  patchClassroom,
  joinClassroom,
  getClassroom,
  getMyClassrooms,
  getClassrooms,
  getMemberInfo,
  getAllMembersAndSubmissions,
};
