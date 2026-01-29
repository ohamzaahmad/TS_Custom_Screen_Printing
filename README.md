# TS Custom Screen Printing - Project Documentation

This project is a premium, high-fidelity eCommerce platform for an industrial screen printing brand. It is built using **React**, **TypeScript**, and **Tailwind CSS**.

## 🏗 Project Architecture

### Frontend Structure
- **`App.tsx`**: The main router. It uses hash-based navigation (`window.location.hash`) to switch between pages without a backend server.
- **`pages/`**: Contains the main views (Home, Catalogue, Quote, etc.).
- **`components/`**: Reusable UI elements like the Navbar and Footer.
- **`services/dataService.ts`**: Manages data. Currently, it uses **localStorage** to simulate a database. When you add a product in the Admin Dashboard, it persists in your browser.

### Styling & Aesthetics
- **Tailwind CSS**: Used for the entire layout. 
- **Glassmorphism**: Implemented via the `.glass` and `.glass-dark` classes in `index.html`.
- **Animations**: Custom CSS animations (`animate-in`, `btn-pulse`) are defined in the global styles.

---

## 🛠 How to Update the "Other Website" Showcase
The **Catalogue** page features a "Live Showcase" designed to display other websites (like a brand's portfolio or a 3D mockup tool).

### 1. The Implementation Logic
In `pages/Catalogue.tsx`, there is a state called `showcaseUrl`. 
```tsx
const [showcaseUrl, setShowcaseUrl] = useState('https://example.com');
```

### 2. How to change it:
- Locate the `showcaseItems` array in `Catalogue.tsx`.
- Update the `url` property to point to the website you want to show.
- **Important Note:** Some websites (like Google, Amazon, or Facebook) block "iframing" for security using `X-Frame-Options`. To show your own other websites, ensure they do not have these headers enabled.

---

## 🚀 Future Backend Requirements
To take this project from a "Simple Website" to a "Functional Business Tool," you will eventually need a backend.

### 1. Database (The "Brain")
- **Recommendation**: **Supabase** (PostgreSQL) or **Firebase**.
- **What it will store**: Product inventory, pricing tables, and user quote requests.

### 2. Authentication (The "Gatekeeper")
- **Current**: A simple `admin/admin` check in `AdminLogin.tsx`.
- **Future**: Use **NextAuth.js** or **Supabase Auth** to allow real admin accounts with secure passwords and multi-factor authentication.

### 3. File Storage (The "Vault")
- **Need**: When users "Start an Order," they need to upload high-resolution artwork (AI, PSD, PDF).
- **Recommendation**: **AWS S3** or **Cloudinary**. You will need to update the `Quote.tsx` form to handle file uploads.

### 4. API Layer
- **Recommendation**: **Node.js (Express)** or **Next.js Server Actions**.
- **Functions**:
    - Sending email notifications when a quote is submitted (using **Resend** or **SendGrid**).
    - Calculating real-time shipping costs via UPS/FedEx APIs.
    - Processing payments via **Stripe**.

---

## 🎨 Design Guidelines
- **Typography**: Uses *Plus Jakarta Sans*. Keep headings `font-black` and `uppercase`.
- **Colors**: 
    - Purple: `#BD00FF` (The "T")
    - Orange: `#FF8A00` (The "S")
- **Spacing**: Use large paddings (`py-24`, `py-40`) to maintain a premium, editorial feel.
