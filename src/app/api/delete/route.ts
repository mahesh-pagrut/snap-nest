import { v2 as cloudinary } from "cloudinary";
 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,  // Keep as it is
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,        // Keep as it is
  api_secret: process.env.CLOUDINARY_API_SECRET,              // Use correctly
});

// console.log("Cloudinary API Secret:", process.env.CLOUDINARY_API_SECRET);


export async function POST(request: Request){
    const { publicId } = await request.json();

    const results = await cloudinary.api.delete_resources([publicId])
    
    return Response.json({
        data: results
    })
}
