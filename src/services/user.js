const updateMyUser = async (data) => {
  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    "https://smartclassroomservice.azurewebsites.net/api/users/updateMyUser",
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

const getMyUser = async () => {
  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;
  const response = await fetch(
    "https://smartclassroomservice.azurewebsites.net/api/users/getMyUser",
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

export { updateMyUser, getMyUser };
