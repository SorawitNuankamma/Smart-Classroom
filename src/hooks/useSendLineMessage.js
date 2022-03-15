const useSendLineMessage = () => {
  const sendLineMessage = async (data) => {
    const response = await fetch(
      `${
        process.env.REACT_APP_ENV === "development"
          ? process.env.REACT_APP_BACKEND_DEV
          : process.env.REACT_APP_BACKEND_PROD
      }/api/lineAPI/sendLineMessage/`,
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

  return sendLineMessage;
};

export default useSendLineMessage;
