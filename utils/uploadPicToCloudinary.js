import axios from "axios";

const uploadPic = async media => {
  try {
    console.log('media' , media)
    const form = new FormData();
    form.append("file", media);
   form.append("upload_preset", "mystory123");
    //form.append("upload_preset", "stishio");
   
    form.append("folder", "/socialApp");

    //  https://api.cloudinary.com/v1_1/maher9911133/image/upload
    const res = await axios.post( 
      'https://api.cloudinary.com/v1_1/maher9911133/image/upload',
     // "https://api.cloudinary.com/v1_1/mahmudakash177/upload",
   //   process.env.CLOUDINARY_URL,
       form);
      
    return res.data.url;

 

  return res.data



  } catch (error) {
    console.log('error upload image 🆗️🆗️🆗️🆗️🆗️🆗️' , error?.message)
    return;
  }
};

export default uploadPic;
