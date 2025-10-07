# $SMOL1 - Smol Coin

From sabotage to supernova—$SMOL1 rises! 🚀

A fun, meme-like, retro pixel-art web application built with Next.js 14 that transforms your profile pictures into pixel art masterpieces.

## Features

- 🎨 **Smol PFP Generator**: Upload your profile picture and transform it into retro pixel art
- 🖼️ **Community Gallery**: Share your creations with the smol community
- 🎮 **Retro Pixel Aesthetic**: Fun, meme-like design with animated pixel characters
- 📱 **Mobile-First Responsive**: Works perfectly on all devices
- ⚡ **Next.js 14**: Built with the latest Next.js features and App Router

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS v4 with custom pixel art theme
- **Fonts**: Google Fonts "Press Start 2P" for retro pixel look
- **AI**: OpenAI Image API for PFP generation
- **Language**: TypeScript
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd smol-coin
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Configuration

### OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it to your `.env.local` file as `OPENAI_API_KEY`

### API Endpoints

- `POST /api/generate` - Generate pixel art PFP from uploaded image
- `GET /api/gallery` - Fetch community gallery items
- `POST /api/gallery` - Submit PFP to community gallery

## Project Structure

```
smol-coin/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/     # OpenAI Image API integration
│   │   │   └── gallery/      # Gallery management API
│   │   ├── gallery/          # Gallery page
│   │   ├── globals.css       # Global styles with pixel art theme
│   │   ├── layout.tsx        # Root layout with navbar/footer
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── HeroSection.tsx   # Animated hero with pixel characters
│   │   ├── PFPGenerator.tsx  # Main PFP generation component
│   │   ├── PixelCharacter.tsx # Animated pixel art characters
│   │   ├── Navbar.tsx        # Navigation component
│   │   └── Footer.tsx        # Footer component
│   └── lib/
│       └── gallery.ts        # In-memory gallery storage
├── public/                   # Static assets
└── package.json
```

## Features in Detail

### Smol PFP Generator

- Upload any profile picture
- Automatic transformation to pixel art using OpenAI Image API
- Custom prompt optimized for retro 32-bit style
- Orange background (#FA8947) with centered character
- Download generated PFP
- Submit to community gallery

### Community Gallery

- View all community-created PFPs
- Submit your own creations
- In-memory storage (can be replaced with database)
- Responsive grid layout

### Pixel Art Design

- Custom TailwindCSS theme with orange primary color
- "Press Start 2P" Google Font for retro feel
- Animated pixel characters with CSS animations
- Mobile-first responsive design
- Pixel-perfect styling

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` environment variable in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Community

Join the smol community and share your pixel art creations! 🎨

Built by the Smol Community 🚀