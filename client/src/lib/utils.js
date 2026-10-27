import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
  }).format(new Date(date))
}

export function formatDateTime(date) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const categoryFallbackImages = {
  vegetables: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop',
  fruits: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&auto=format&fit=crop',
  grains: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop',
  pulses: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=800&auto=format&fit=crop',
  spices: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop',
  dairy: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop',
  other: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&auto=format&fit=crop',
}

const cropFallbacks = {
  tomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop',
  onion: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop',
  potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop',
  mango: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop',
  grape: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?w=800&auto=format&fit=crop',
  grapes: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?w=800&auto=format&fit=crop',
  spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop',
  pomegranate: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop',
  chilli: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop',
  chili: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop',
  coconut: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&auto=format&fit=crop',
  cashew: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop',
  rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop',
  wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop',
  turmeric: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop',
}

export function getProductImageUrl(url, categoryOrCrop = 'vegetables') {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const apiBase = apiUrl.replace(/\/api\/?$/, '')

  const key = categoryOrCrop ? String(categoryOrCrop).toLowerCase() : ''
  let defaultPlaceholder = categoryFallbackImages[key] || categoryFallbackImages.vegetables

  for (const [cropKey, cropUrl] of Object.entries(cropFallbacks)) {
    if (key.includes(cropKey)) {
      defaultPlaceholder = cropUrl
      break
    }
  }

  if (!url || typeof url !== 'string' || url.trim() === '' || url === '/placeholder.jpg' || url.includes('placeholder-product')) {
    return defaultPlaceholder
  }

  // Handle broken relative paths like /images/tomato.jpg
  if (url.startsWith('/images/') && !url.includes('auth') && !url.includes('profile-cover')) {
    const urlLower = url.toLowerCase()
    for (const [cropKey, cropUrl] of Object.entries(cropFallbacks)) {
      if (urlLower.includes(cropKey)) {
        return cropUrl
      }
    }
    return defaultPlaceholder
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  if (url.startsWith('/uploads')) {
    return `${apiBase}${url}`
  }
  if (url.startsWith('uploads')) {
    return `${apiBase}/${url}`
  }
  return url
}
