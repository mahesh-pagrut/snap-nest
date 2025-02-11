# SnapNest - Personalized Media Library

## Introduction
SnapNest is a **personalized media library** like Google Photos, built with **Next.js, Cloudinary, and Tanstack Query**. It allows users to seamlessly **upload, organize, and edit photos and videos** with AI-powered enhancements, creative effects, and optimization features. Perfect for creators and developers looking for a smart media management solution.

## 🚀 Deployed App
**Live Demo:** [SnapNest](https://snap-nest-seven.vercel.app/)

## 📌 Features
- **Image & Video Management:** Upload, view, tag, and search media assets.
- **Editing & Enhancements:** AI-powered enhancements, filters, background removal.
- **Optimized Performance:** Fast media retrieval, lazy loading, and caching.
- **Creative Features:** Ken Burns-style animations, collages, and color pop effects.
- **Developer-Friendly:** Next.js API routes, metadata display, and custom hooks.

## 🛠 Technology Stack
### Framework & Libraries
- **Next.js** - Full-stack React framework
- **Tanstack Query** - Data fetching & caching
- **Cloudinary** - Image & video storage and optimization

### 📌 Languages & Styling
- **JavaScript & TypeScript**
- **Tailwind CSS** - Utility-first styling

### 📦 Key Dependencies
- `@tanstack/react-query` - Data fetching & caching
- `next-cloudinary` - Cloudinary integration
- `lucide-react` - Icon library
- `clsx, tailwind-merge, tailwindcss-animate` - Styling utilities
- Radix UI components for dialogs, dropdowns, tabs, and checkboxes

### ⚙ Development Tools
- **ESLint** - Linting & code quality
- **TypeScript** - Static typing
- **PostCSS & Autoprefixer** - CSS processing

---

## 🚀 Getting Started

### 📌 Prerequisites
Ensure you have the following installed:
- **Node.js** (LTS version recommended)
- **npm** or **yarn** (for package management)

### 📂 Installation & Setup
#### 1️⃣ Clone the repository
```sh
git clone https://github.com/your-username/snapnest.git
cd snapnest 
```
#### 2️⃣ Install dependencies
```sh
npm install
```
#### 3️⃣ Set up environment variables
```sh
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
NEXT_PUBLIC_CLOUDINARY_API_KEY="<Your API Key>"
CLOUDINARY_API_SECRET="<Your API Secret>"
```
#### 4️⃣ Start the development server
```sh
npm run dev
```
**SnapNest will now be running at**  (http://localhost:3000/) 🎉

### 📸 Using SnapNest
To start using SnapNest, simply upload some images! The Upload button is located at the top right of the library page.

- After uploading, the images will appear in your gallery.
- Click on an image to edit, enhance, or add creative effects.
- Easily search and manage your media with tags and metadata.
