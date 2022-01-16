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
  const response = await fetch("http://localhost:5000/api/lineUsers/isLogin", {
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

exports.getLineToken = async (code) => {
  //TODO get client secert to config
  //TODO generate the code verifier
  const response = await fetch("https://api.line.me/oauth2/v2.1/token", {
    method: "POST",
    mode: "cors",
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:3000/authentication/result",
      client_id: "1656756645",
      client_secret: "d6af803613c6210043f93a65dbe70dd7",
      code_verifier: "wJKN8qz5t8SSI9lMFhZA6qwNkQBkuPZoCxzRhwLRUo1",
    }),
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

exports.lineUserLogin = async (data) => {
  const token = window.sessionStorage.lineToken;
  const response = await fetch("http://localhost:5000/api/lineUsers/login", {
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

exports.lineUserSignUp = async (data) => {
  const token = window.sessionStorage.lineToken;
  const response = await fetch("http://localhost:5000/api/lineUsers/signup", {
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

//https://smartclassroomservice.azurewebsites.net/api/users/login
