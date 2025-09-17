# 🛍️ Mini Seller Console

A lightweight console to triage **Leads** and convert them into **Opportunities**.  
Built with **React + Tailwind CSS** and follows the requirements of the coding challenge.

## 📌 Features (MVP)

✅ **Leads List**
- Loads leads from a local JSON file.
- Fields: `id`, `name`, `company`, `email`, `source`, `score`, `status`.
- Features: **search** (name/company), **filter** (status), **sort** (score descending and ID descending *extra*)

✅ **Lead Detail Panel**
- Click a row to open a slide-over panel.
- Inline edit **status** and **email** (with email validation).

✅ **Convert to Opportunity**
- "Convert Lead" button to open a slide-over panel.
- Creates an Opportunity with: `id`, `name`, `stage`, `amount (optional)`, `accountName`.
- Opportunities displayed in a simple table.

✅ **Extras**
- Responsive layout (desktop → mobile)
- Persisted **filter/sort** in `localStorage`
- Feedback toaster on updating lead and creating opportunity

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/mini-seller-console.git
cd mini-seller-console
```

### 2️⃣ Install Dependencies 
```bash
npm install
```

### 3️⃣ Run the Development Script
```bash
npm run dev
```
Open http://localhost:5173/ in your browser.

### 📂 Project Structure
```bash
  src/
 ├─ components/
 │   ├─ ui/                     # Reusable UI components [shadcn] (buttons, tables, sidebar, etc.)
 │   └─ internal/            # App-specific components (AppSidebar, LeadDetailPanel)
 ├─ data/
 │   └─ leads.json          # Local leads data source
 ├─ pages/
 │   ├─ layout/               # Layout of the aplication
 │   ├─ leads-page/        # Leads table 
 │   └─ opportunities-page/ # Opportunities table
 ├─ context/                   # Context API for the aplication
 ├─ types/                      # Leads and Opportunities Type
 └─ main.tsx                  # App entry point
 └─ app.tsx                    # Routing for the App
```