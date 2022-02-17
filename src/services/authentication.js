const userLogin = async (data) => {
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/users/login`,
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }
  );
  return response.json(); // parses JSON response into native JavaScript objects
};

const userRegister = async (data) => {
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/users/signup`,
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }
  );
  return response.json(); // parses JSON response into native JavaScript objects
};

const isLogin = async () => {
  const token = window.sessionStorage.accessToken;
  if (!token || token === "undefined") {
    throw new Error("you are not logged in");
  }
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_ENV === "development"
          ? process.env.REACT_APP_BACKEND_DEV
          : process.env.REACT_APP_BACKEND_PROD
      }/api/lineUsers/isLogin`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: "{}", // body data type must match "Content-Type" header
      }
    );
    if (response.status === "fail") {
      throw new Error("you are not logged in");
    }
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (e) {
    throw new Error(e);
  }
};

const getLineToken = async (code) => {
  //TODO get client secert to config
  //TODO generate the code verifier
  const response = await fetch("https://api.line.me/oauth2/v2.1/token", {
    method: "POST",
    mode: "cors",
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri:
        "https://smart-classroom-demo.vercel.app/authentication/result",
      client_id: "1656756645",
      client_secret: "d6af803613c6210043f93a65dbe70dd7",
      code_verifier: "wJKN8qz5t8SSI9lMFhZA6qwNkQBkuPZoCxzRhwLRUo1",
    }),
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

const lineUserLogin = async (data) => {
  const token = window.sessionStorage.lineToken;
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_ENV === "development"
          ? process.env.REACT_APP_BACKEND_DEV
          : process.env.REACT_APP_BACKEND_PROD
      }/api/lineUsers/login`,
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
  } catch (e) {
    throw new Error(e);
  }
};

const lineUserAuthen = async (data) => {
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_ENV === "development"
          ? process.env.REACT_APP_BACKEND_DEV
          : process.env.REACT_APP_BACKEND_PROD
      }/api/lineUsers/authen`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }
    );
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (e) {
    throw new Error(e);
  }
};

const lineUserSignUp = async (data) => {
  const token = window.sessionStorage.lineToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/lineUsers/signup`,
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

//https://smartclassroomservice.azurewebsites.net/api/users/login

export {
  userLogin,
  userRegister,
  lineUserSignUp,
  lineUserLogin,
  isLogin,
  getLineToken,
  lineUserAuthen,
};
