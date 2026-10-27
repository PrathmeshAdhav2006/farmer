import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadToCloudinary = async (filePath, folder = 'products') => {
  const fileName = path.basename(filePath)
  const isConfigured =
    process.env.CLOUDINARY_CLOUD_NAME &&
    !process.env.CLOUDINARY_CLOUD_NAME.includes('your_') &&
    process.env.CLOUDINARY_API_KEY &&
    !process.env.CLOUDINARY_API_KEY.includes('your_')

  // If Cloudinary credentials are not configured, keep local file in uploads/
  if (!isConfigured) {
    return {
      secure_url: `/uploads/${fileName}`,
      public_id: null,
    }
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `farmmarket/${folder}`,
      resource_type: 'auto',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    })

    // Delete local file after successful upload to Cloudinary
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath)
      } catch (err) {
        console.warn('Could not remove temporary local file:', err.message)
      }
    }

    return result
  } catch (error) {
    console.warn(`Cloudinary upload failed: ${error.message}. Preserving local file as fallback: /uploads/${fileName}`)
    // Keep local file in uploads/
    return {
      secure_url: `/uploads/${fileName}`,
      public_id: null,
    }
  }
}

export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
  }
}

export default cloudinary
