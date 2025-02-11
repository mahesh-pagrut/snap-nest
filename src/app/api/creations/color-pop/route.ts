import { v2 as cloudinary } from "cloudinary";
import { getCldImageUrl } from "next-cloudinary";
 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,  // Keep as it is
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,        // Keep as it is
  api_secret: process.env.CLOUDINARY_API_SECRET,              // Use correctly
});

// console.log("Cloudinary API Secret:", process.env.CLOUDINARY_API_SECRET);


export async function POST(request: Request){
    const { publicId } = await request.json();

    const backgroundRemovedUrl = getCldImageUrl({
      src: publicId,
      removeBackground: true,
      format: 'png',
      quality: 'default',
      version: Date.now()
    })


    async function checkStatus(url: string){
        const response = await fetch(url);
        if (response.ok){
          return true
        }

        await new Promise((resolve) =>{
          setTimeout(() =>{
            resolve(undefined)
          },500)
        });

        return await checkStatus(url)
    }

    await checkStatus(backgroundRemovedUrl);





    const uploadOptions: Record<string, string | boolean | Array<string>> = {};
    
    uploadOptions.tags = ['background-removed', `original-${publicId}`]


    const results = await cloudinary.uploader.upload(backgroundRemovedUrl, uploadOptions)

    const creationUrl = getCldImageUrl({
      width: 1200,
      height: 1200,
      src: publicId,
      crop:{
        type: 'fill',
        gravity: 'center',
        source:true,
      },
      grayscale: true,
      overlays: [{
        publicId: results.public_id
      }],
      version: Date.now()
    })

    return Response.json({
        url: creationUrl
    })
}
