exports.UpdateMyUser = async (data) => {
  // TODO get token from localStorage
  const token = window.sessionStorage.accessToken;

  console.log(token);

  const response = await fetch("http://localhost:5000/api/users/updateMyUser", {
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
