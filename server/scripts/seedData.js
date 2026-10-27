import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../src/models/User.js'
import Product from '../src/models/Product.js'
import APMCPrice from '../src/models/APMCPrice.js'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/farmer_marketplace'

const seedUsers = async () => {
  const salt = await bcrypt.genSalt(10)

  const users = [
    {
      fullName: 'Admin User',
      email: 'admin@demo.com',
      phone: '9999999999',
      password: await bcrypt.hash('admin123', salt),
      userType: 'admin',
      isVerified: true,
      isActive: true,
    },
    {
      fullName: 'Ramesh Patil',
      email: 'farmer@demo.com',
      phone: '9876543210',
      password: await bcrypt.hash('demo123', salt),
      userType: 'farmer',
      district: 'Nashik',
      taluka: 'Nashik',
      village: 'Ozar',
      farmSize: 5,
      isVerified: true,
      isActive: true,
    },
    {
      fullName: 'Suresh More',
      email: 'farmer2@demo.com',
      phone: '9876543211',
      password: await bcrypt.hash('demo123', salt),
      userType: 'farmer',
      district: 'Ratnagiri',
      taluka: 'Ratnagiri',
      village: 'Devgad',
      farmSize: 8,
      isVerified: true,
      isActive: true,
    },
    {
      fullName: 'Ganesh Jadhav',
      email: 'farmer3@demo.com',
      phone: '9876543212',
      password: await bcrypt.hash('demo123', salt),
      userType: 'farmer',
      district: 'Pune',
      taluka: 'Junnar',
      village: 'Narayangaon',
      farmSize: 3,
      isVerified: false,
      isActive: true,
    },
    {
      fullName: 'Priya Sharma',
      email: 'buyer@demo.com',
      phone: '9876543213',
      password: await bcrypt.hash('demo123', salt),
      userType: 'buyer',
      isVerified: true,
      isActive: true,
      addresses: [
        {
          label: 'home',
          fullName: 'Priya Sharma',
          phone: '9876543213',
          addressLine1: '123 MG Road',
          addressLine2: 'Near City Mall',
          city: 'Pune',
          district: 'Pune',
          pincode: '411001',
          isDefault: true,
        },
      ],
    },
    {
      fullName: 'Amit Deshmukh',
      email: 'buyer2@demo.com',
      phone: '9876543214',
      password: await bcrypt.hash('demo123', salt),
      userType: 'buyer',
      isVerified: true,
      isActive: true,
    },
  ]

  await User.deleteMany({})
  const createdUsers = await User.insertMany(users)
  console.log(`✅ ${createdUsers.length} users seeded`)
  return createdUsers
}

const seedProducts = async (farmers) => {
  const farmer1 = farmers.find(u => u.email === 'farmer@demo.com')
  const farmer2 = farmers.find(u => u.email === 'farmer2@demo.com')
  const farmer3 = farmers.find(u => u.email === 'farmer3@demo.com')

  const products = [
    {
      farmer: farmer1._id,
      cropName: 'Fresh Tomatoes',
      category: 'vegetables',
      description: 'Freshly harvested red ripe tomatoes from Nashik organic farms. Rich in flavor and vitamins.',
      quantityAvailable: 500,
      pricePerKg: 40,
      qualityGrade: 'A',
      harvestDate: new Date('2024-12-01'),
      district: 'Nashik',
      isOrganic: true,
      isAvailable: true,
      isApproved: true,
      isFeatured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop', publicId: null },
        { url: 'https://images.unsplash.com/photo-1546470427-227c7369a988?w=800&auto=format&fit=crop', publicId: null }
      ],
    },
    {
      farmer: farmer1._id,
      cropName: 'Red Onions',
      category: 'vegetables',
      description: 'Premium quality red onions, naturally sun-cured with long shelf life.',
      quantityAvailable: 1000,
      pricePerKg: 25,
      qualityGrade: 'A',
      harvestDate: new Date('2024-11-25'),
      district: 'Nashik',
      isOrganic: false,
      isAvailable: true,
      isApproved: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop', publicId: null }
      ],
    },
    {
      farmer: farmer1._id,
      cropName: 'Thompson Grapes',
      category: 'fruits',
      description: 'Sweet seedless Thompson grapes from lush Nashik vineyards.',
      quantityAvailable: 200,
      pricePerKg: 120,
      qualityGrade: 'A',
      harvestDate: new Date('2024-12-05'),
      district: 'Nashik',
      isOrganic: false,
      isAvailable: true,
      isApproved: true,
      isFeatured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?w=800&auto=format&fit=crop', publicId: null }
      ],
    },
    {
      farmer: farmer2._id,
      cropName: 'Alphonso Mangoes',
      category: 'fruits',
      description: 'World-famous authentic Hapus mangoes naturally ripened in Ratnagiri orchards.',
      quantityAvailable: 300,
      pricePerKg: 350,
      qualityGrade: 'A',
      harvestDate: new Date('2024-04-15'),
      district: 'Ratnagiri',
      isOrganic: false,
      isAvailable: true,
      isApproved: true,
      isFeatured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop', publicId: null }
      ],
    },
    {
      farmer: farmer2._id,
      cropName: 'Cashew Nuts',
      category: 'other',
      description: 'Hand-picked raw cashew nuts from the Konkan coastline.',
      quantityAvailable: 50,
      pricePerKg: 800,
      qualityGrade: 'A',
      harvestDate: new Date('2024-05-01'),
      district: 'Ratnagiri',
      isOrganic: true,
      isAvailable: true,
      isApproved: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop', publicId: null }
      ],
    },
    {
      farmer: farmer3._id,
      cropName: 'Potatoes',
      category: 'vegetables',
      description: 'Farm-fresh uniform potatoes, ideal for home and bulk culinary use.',
      quantityAvailable: 800,
      pricePerKg: 20,
      qualityGrade: 'B',
      harvestDate: new Date('2024-11-20'),
      district: 'Pune',
      isOrganic: false,
      isAvailable: true,
      isApproved: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop', publicId: null }
      ],
    },
    {
      farmer: farmer3._id,
      cropName: 'Organic Spinach',
      category: 'vegetables',
      description: 'Crisp, nutrient-dense spinach leaves harvested early morning in Pune.',
      quantityAvailable: 100,
      pricePerKg: 60,
      qualityGrade: 'A',
      harvestDate: new Date('2024-12-08'),
      district: 'Pune',
      isOrganic: true,
      isAvailable: true,
      isApproved: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop', publicId: null }
      ],
    },
    {
      farmer: farmer1._id,
      cropName: 'Pomegranate',
      category: 'fruits',
      description: 'Bhagwa variety pomegranates with deep red, juicy, sweet arils.',
      quantityAvailable: 150,
      pricePerKg: 180,
      qualityGrade: 'A',
      harvestDate: new Date('2024-11-15'),
      district: 'Nashik',
      isOrganic: false,
      isAvailable: true,
      isApproved: true,
      isFeatured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop', publicId: null }
      ],
    },
    {
      farmer: farmer3._id,
      cropName: 'Green Chilli',
      category: 'vegetables',
      description: 'Pungent, fresh green chillies packed with flavor and heat.',
      quantityAvailable: 200,
      pricePerKg: 80,
      qualityGrade: 'B',
      harvestDate: new Date('2024-12-07'),
      district: 'Pune',
      isOrganic: false,
      isAvailable: true,
      isApproved: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop', publicId: null }
      ],
    },
    {
      farmer: farmer2._id,
      cropName: 'Coconut',
      category: 'other',
      description: 'Fresh tender coconuts rich in mineral water and soft meat.',
      quantityAvailable: 500,
      pricePerKg: 30,
      qualityGrade: 'A',
      harvestDate: new Date('2024-12-01'),
      district: 'Ratnagiri',
      isOrganic: true,
      isAvailable: true,
      isApproved: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&auto=format&fit=crop', publicId: null }
      ],
    },
  ]

  await Product.deleteMany({})
  const createdProducts = await Product.insertMany(products)
  console.log(`✅ ${createdProducts.length} products seeded`)
}

const seedAPMCPrices = async () => {
  const commodities = ['Tomato', 'Onion', 'Potato', 'Grapes', 'Pomegranate', 'Sugarcane', 'Wheat', 'Rice', 'Soybean', 'Cotton']
  const districts = ['Nashik', 'Pune', 'Nagpur', 'Aurangabad', 'Kolhapur', 'Solapur', 'Sangli']
  const basePrices = { Tomato: 2500, Onion: 1800, Potato: 1100, Grapes: 5000, Pomegranate: 7500, Sugarcane: 3000, Wheat: 2400, Rice: 3200, Soybean: 4800, Cotton: 6500 }

  const prices = []

  for (const commodity of commodities) {
    for (const district of districts) {
      for (let i = 0; i < 90; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const basePrice = basePrices[commodity]
        const variation = (Math.random() - 0.5) * basePrice * 0.3
        const modalPrice = Math.round(basePrice + variation)

        prices.push({
          district,
          market: `${district} APMC`,
          commodity,
          variety: 'Local',
          grade: 'FAQ',
          minPrice: Math.round(modalPrice * 0.85),
          maxPrice: Math.round(modalPrice * 1.15),
          modalPrice,
          arrivalQuantity: Math.floor(Math.random() * 1000) + 100,
          date,
        })
      }
    }
  }

  await APMCPrice.deleteMany({})
  await APMCPrice.insertMany(prices)
  console.log(`✅ ${prices.length} APMC price records seeded`)
}

const seedAll = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('📦 Connected to MongoDB')

    const users = await seedUsers()
    await seedProducts(users)
    await seedAPMCPrices()

    console.log('\n🎉 All data seeded successfully!')
    console.log('\n📋 Demo Accounts:')
    console.log('   Admin:  admin@demo.com / admin123')
    console.log('   Farmer: farmer@demo.com / demo123')
    console.log('   Buyer:  buyer@demo.com / demo123')

    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seedAll()