exports.userLogin = async (data) => {
  const response = await fetch("http://localhost:5000/api/users/login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

exports.userRegister = async (data) => {
  const response = await fetch("http://localhost:5000/api/users/signup", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

exports.isLogin = async () => {
  const token = window.sessionStorage.accessToken;
  if (!token || token === "undefined") {
    throw new Error("you are not logged in");
  }
  const response = await fetch("http://localhost:5000/api/users/isLogin", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: "{}", // body data type must match "Content-Type" header
  });
  if (response.status === "fail") {
    throw new Error("you are not logged in");
  }
  return response.json(); // parses JSON response into native JavaScript objects
};

//https://smartclassroomservice.azurewebsites.net/api/users/login
