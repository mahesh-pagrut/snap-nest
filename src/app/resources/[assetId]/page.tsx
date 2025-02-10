import {v2 as cloudinary} from 'cloudinary'
import MediaViewer from '@/components/MediaViewer';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})



async function Resource({ params }: { params: Promise<{ assetId: string }> }) {
  const resolvedParams = await params; // Await the params if it's a Promise

  const { resources } = await cloudinary.api.resources_by_asset_ids(
    resolvedParams.assetId,
    { tags: true }
  );

  return <MediaViewer resource={resources[0]} />;
}

export default Resource;