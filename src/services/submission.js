exports.postSubmission = async (data) => {
  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;
  const response = await fetch("http://localhost:5000/api/submissions/", {
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

exports.patchSubmission = async (data, id) => {
  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;
  const response = await fetch(`http://localhost:5000/api/submissions/${id}`, {
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

exports.getMySubmission = async (data) => {
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `http://localhost:5000/api/submissions/getMySubmission`,
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

exports.getSubmissions = async (filterObj) => {
  let searchParams = new URLSearchParams(filterObj);

  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `http://localhost:5000/api/submissions?${searchParams.toString()}`,
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

exports.getSubmissionsAndFile = async (filterObj) => {
  let searchParams = new URLSearchParams(filterObj);

  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `http://localhost:5000/api/submissions/getSubmissionsAndFile?${searchParams.toString()}`,
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
