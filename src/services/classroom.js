exports.postClassroom = async (data) => {
  const token = window.sessionStorage.accessToken;
  const response = await fetch("http://localhost:5000/api/classrooms/", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

exports.patchClassroom = async (data, id) => {
  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;
  const response = await fetch(`http://localhost:5000/api/classrooms/${id}`, {
    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

exports.joinClassroom = async (data) => {
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    "http://localhost:5000/api/classrooms/joinClassroom",
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

exports.getClassroom = async (id) => {
  const token = window.sessionStorage.accessToken;
  const response = await fetch(`http://localhost:5000/api/classrooms/${id}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

exports.getClassrooms = async (filterObj) => {
  let searchParams = new URLSearchParams(filterObj);

  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `http://localhost:5000/api/classrooms?${searchParams.toString()}`,
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

exports.getMyClassrooms = async () => {
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `http://localhost:5000/api/classrooms/getMyClassroom`,
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

exports.getMemberInfo = async (filterObj) => {
  let searchParams = new URLSearchParams(filterObj);

  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `http://localhost:5000/api/classrooms/getMemberInfo?${searchParams.toString()}`,
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
