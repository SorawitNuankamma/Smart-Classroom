exports.postClassroom = async (data) => {
  // TODO get token from localStorage
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

exports.getClassroom = async (id) => {
  // TODO get token from localStorage
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

  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `http://localhost:5000/api/classrooms?${searchParams}`,
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
