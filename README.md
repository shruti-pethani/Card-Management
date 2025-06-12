# Card Management

## 🚀 Features

### Card Management
- **Add New Cards**: Comprehensive form with validation for adding credit/debit cards
- **Card Display**: Beautiful card visualizations with realistic design
- **Show/Hide Card Numbers**: Toggle visibility of sensitive card information
- **Card Navigation**: Horizontal carousel with navigation arrows and dots
- **Archive Cards**: Archive/unarchive cards with visual feedback
- **Default Card Setting**: Set cards as default for each type (credit/debit)
- **GPay Integration**: Add/remove cards from Google Pay

### Security & Validation
- **Card Number Validation**: Luhn algorithm validation for card numbers
- **Expiry Date Validation**: Future date validation (MM/YYYY format)
- **CVV Protection**: Password field with 3-4 digit validation
- **Form Validation**: Comprehensive client-side validation with error messages

### User Interface
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Intuitive Navigation**: Easy-to-use sidebar navigation
- **Visual Feedback**: Hover states, transitions, and loading indicators
- **Card Actions**: Lock, Archive, Set Default, and GPay integration buttons


## 🛠️ Tech Stack

- **Frontend Framework**: React 
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shruti-pethani/Card-Management.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage

### Adding a New Card

1. Click the **"Add Card"** button in the top right
2. Fill in the required information:
   - **Name**: Cardholder name (max 35 characters)
   - **Bank Name**: Name of the issuing bank
   - **Card Type**: Select Credit or Debit
   - **Card Number**: 16-digit card number (validated using Luhn algorithm)
   - **Valid Till**: Expiry date in MM/YYYY format
   - **CVV**: 3 digit security code
3. Optional settings:
   - **Set as Default**: Make this the default card for the selected type
   - **Add to GPay**: Include this card in Google Pay
4. Click **"Add Card"** to save
