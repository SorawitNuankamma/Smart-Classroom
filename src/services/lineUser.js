const patchLineUser = async (data, id) => {
  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    `${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV
        : process.env.REACT_APP_BACKEND_PROD
    }/api/lineUsers/${id}`,
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

export { patchLineUser };
