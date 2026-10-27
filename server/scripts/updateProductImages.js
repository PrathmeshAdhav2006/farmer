import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import Product from '../src/models/Product.js'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/farmer_marketplace'

const cropImageMap = {
  tomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop',
  onion: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop',
  grape: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?w=800&auto=format&fit=crop',
  mango: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop',
  cashew: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop',
  potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop',
  spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop',
  pomegranate: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop',
  chilli: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop',
  chili: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop',
  coconut: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&auto=format&fit=crop',
  wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop',
  rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop',
  turmeric: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop',
}

const categoryImageMap = {
  vegetables: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop',
  fruits: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&auto=format&fit=crop',
  grains: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop',
  pulses: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=800&auto=format&fit=crop',
  spices: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop',
  dairy: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop',
  other: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&auto=format&fit=crop',
}

const getImageForCrop = (cropName, category) => {
  const name = (cropName || '').toLowerCase()
  for (const [key, url] of Object.entries(cropImageMap)) {
    if (name.includes(key)) {
      return url
    }
  }
  const cat = (category || '').toLowerCase()
  return categoryImageMap[cat] || categoryImageMap.vegetables
}

const updateProductImages = async () => {
  try {
    console.log(`🔌 Connecting to MongoDB: ${MONGODB_URI}...`)
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    const products = await Product.find({})
    console.log(`📦 Found ${products.length} products to check...`)

    let updatedCount = 0

    for (const product of products) {
      const hasValidImage = product.images &&
        product.images.length > 0 &&
        product.images[0].url &&
        !product.images[0].url.includes('placehold.co') &&
        !product.images[0].url.includes('placeholder.jpg') &&
        !product.images[0].url.includes('placeholder-product')

      if (!hasValidImage) {
        const selectedUrl = getImageForCrop(product.cropName, product.category)
        product.images = [
          {
            url: selectedUrl,
            publicId: null,
          },
        ]
        await product.save()
        console.log(`  🌾 Updated "${product.cropName}" (${product.category}) -> ${selectedUrl}`)
        updatedCount++
      }
    }

    console.log(`\n🎉 Successfully updated ${updatedCount} product(s) with high-resolution imagery.`)
    await mongoose.disconnect()
    console.log('🔌 Disconnected from MongoDB.')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating product images:', error)
    process.exit(1)
  }
}

updateProductImages()

