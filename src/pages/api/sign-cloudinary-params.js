import cloudinary from "../../utils/cloudinary";

async function handler(req, res) {
  try {
    const signature = cloudinary.utils.api_sign_request(
      req.body.paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({
      signature,
    });
  } catch (error) {
      console.log(error)
    res.status(500).json({ error, data: null });
  }
}

// disable body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
