import axios from "axios";

const url = "http://localhost:3001";

const uploadImage = async (data) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${url}/single`,
      data: data,
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export { uploadImage };