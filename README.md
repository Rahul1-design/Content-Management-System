# 📝 Full-Stack CMS Platform

A modern, production-ready Content Management System built with Next.js 14, featuring multi-user authentication, rich content editing, and advanced post management.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue)

## ✨ Features

### 🔐 Authentication & Authorization
- NextAuth.js integration with JWT sessions
- Role-based access control (Admin, Writer, Reader)
- Secure credential-based authentication
- Protected routes and API endpoints
- Session management with automatic token refresh

### 📝 Content Management
- Rich text editor powered by TipTap
- WYSIWYG editing with formatting toolbar
- Image uploads via Cloudinary
- Cover image support for posts
- Draft and Published status
- Category and tag organization
- Auto-generated URL slugs

### 🎨 User Interface
- Responsive design with Tailwind CSS
- Clean, modern admin dashboard
- Real-time post statistics
- Intuitive post creation/editing interface
- Beautiful public-facing blog pages
- Mobile-optimized layouts

### 🔍 Search & Discovery
- Full-text search across posts
- Category filtering
- Tag-based navigation
- Advanced post filtering
- Optimized database queries

### 👥 Multi-User System
- User registration and login
- Writer dashboard with post management
- Admin panel for user management
- Post ownership and permissions
- Author attribution on posts

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Rich Text Editor:** TipTap
- **Icons:** Lucide React
- **State Management:** React Hooks

### Backend
- **Runtime:** Node.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** NextAuth.js
- **Password Hashing:** bcryptjs
- **Image Storage:** Cloudinary

### DevOps
- **Version Control:** Git
- **Package Manager:** npm
- **Environment:** dotenv

## 📁 Project Structure
```
my-cms/
├── app/
│   ├── (auth)/
│   │   ├── signin/           # Login page
│   │   └── signup/           # Registration page
│   ├── (app)/
│   │   ├── posts/            # Public post pages
│   │   └── admin/            # Admin dashboard
│   ├── api/
│   │   ├── auth/             # NextAuth routes
│   │   ├── posts/            # Post CRUD endpoints
│   │   ├── users/            # User management
│   │   └── upload/           # Image upload handler
│   ├── layout.tsx
│   ├── page.tsx              # Homepage
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── RichTextEditor.tsx
│   └── ImageUploader.tsx
├── lib/
│   ├── db.ts                 # MongoDB connection
│   ├── auth.ts               # NextAuth config
│   └── cloudinary.ts         # Cloudinary setup
├── models/
│   ├── User.ts               # User schema
│   ├── Post.ts               # Post schema
│   └── Category.ts           # Category schema
├── types/
│   └── next-auth.d.ts        # NextAuth types
└── middleware.ts             # Route protection
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account for image uploads

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cms-platform.git
cd cms-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cms
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-key-minimum-32-characters

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

### First Time Setup

1. **Create an account** at `/auth/signup`
2. **Sign in** at `/auth/signin`
3. **Access admin dashboard** at `/admin/dashboard`
4. **Create your first post** at `/admin/posts/new`

## 📖 API Routes

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `POST /api/users` - User registration

### Posts
- `GET /api/posts` - Fetch all posts (with filters)
- `POST /api/posts` - Create new post (protected)
- `GET /api/posts/[id]` - Get single post
- `PUT /api/posts/[id]` - Update post (protected)
- `DELETE /api/posts/[id]` - Delete post (protected)

### Upload
- `POST /api/upload` - Upload image to Cloudinary (protected)

### Categories
- `GET /api/categories` - Fetch all categories
- `POST /api/categories` - Create category (admin only)

## 🔒 Security Features

- Password hashing with bcryptjs (10 rounds)
- JWT-based session management
- HTTP-only cookies for tokens
- CSRF protection via NextAuth
- Role-based route protection
- API endpoint authentication
- Secure environment variable handling
- XSS protection with Next.js
- SQL injection prevention via Mongoose

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Touch-optimized interfaces
- Adaptive layouts for all screen sizes

## 🎯 Key Features Explained

### Rich Text Editor
- Bold, italic, strikethrough formatting
- Headings (H1, H2)
- Bullet and numbered lists
- Blockquotes
- Code blocks
- Link insertion
- Image embedding
- Undo/redo functionality

### Role-Based Access
- **Reader:** Can view published posts
- **Writer:** Can create/edit own posts
- **Admin:** Full access to all features

### Post Management
- Create drafts before publishing
- Edit posts with version history
- Delete posts with confirmation
- Upload cover images
- Add categories and tags
- Auto-generate SEO-friendly URLs

## 🐛 Known Limitations

- No comment system (planned for v2.0)
- No post scheduling (planned for v2.0)
- No analytics dashboard (planned for v2.0)
- Limited SEO optimization
- No email notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- TipTap for the rich text editor
- Tailwind CSS for styling utilities
- MongoDB for the database
- NextAuth.js for authentication

## 📧 Contact

For questions or feedback, please reach out at: your.email@example.com

---

**⭐ If you found this project helpful, please give it a star!**
```

---

## **Additional Files to Include**

### **LICENSE**
```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

### **.gitignore**
```
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

---

## **GitHub Repository Topics (Add These)**
```
nextjs
typescript
mongodb
tailwindcss
nextauth
cms
blog
content-management
react
full-stack
authentication
tiptap
cloudinary
mongoose
jwt
```

---

## **For Your Portfolio/LinkedIn**

### **Project Title**
```
Full-Stack Content Management System (CMS)
```

### **Short Description**
```
Built a production-ready CMS platform with Next.js 14, featuring user authentication, role-based access control, rich text editing with TipTap, image uploads via Cloudinary, and advanced search functionality. Implemented secure JWT-based authentication with NextAuth.js and MongoDB for data persistence.
```

### **Key Achievements**
```
- Developed complete authentication system with role-based permissions (Admin/Writer/Reader)
- Integrated TipTap rich text editor with full formatting toolbar and image embedding
- Implemented Cloudinary for efficient image storage and CDN delivery
- Built RESTful API with CRUD operations for posts, users, and categories
- Created responsive UI with Tailwind CSS supporting mobile and desktop views
- Optimized database queries with MongoDB aggregation and indexing
- Deployed secure application with environment-based configuration
