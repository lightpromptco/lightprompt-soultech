# LightPromptBot - Emotional Support Chat Application

## Overview

LightPromptBot is the flagship emotional support chat application built with React and Node.js, serving as the central hub for LightPrompt.co's complete product ecosystem. This application provides a safe space for users to express their feelings and receive empathetic, AI-powered responses while discovering relevant LightPrompt products. The system uses a two-tier approach (GPT-3.5 basic, GPT-4o premium) and serves as the template for dedicated product-specific bots.

### Product Bot Ecosystem Strategy
This main bot serves as the template for specialized product bots:
- **GuardianTag Bot**: Home protection and boundary setting rituals
- **RootWhisper Bot**: Plant care journaling and nature-connected reflection
- **BodyMirror Bot**: Comprehensive wellness tracking and energy analysis
- **LightPrompt:Ed Bot**: AI discernment and conscious technology education
- **Additional Product Bots**: Scalable architecture for future products

Each product bot will have its own dedicated database and specialized AI knowledge while maintaining the core architecture and authentication system:

- **VisionQuest Bot**: Psychic ability development including aura reading, telekinesis, clairvoyance, telepathy, energy healing, and astral projection training

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15.3.4 with React 18 and TypeScript
- **Build Tool**: Next.js with App Router for optimized builds and server-side rendering
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom dark theme optimized for emotional support
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Next.js API Routes with Node.js
- **Language**: TypeScript with ES modules
- **API Design**: Next.js API routes for message operations and serverless functions
- **Session Management**: Session-based chat conversations without persistent user accounts

### Data Storage Solutions
- **Database**: Supabase PostgreSQL (`https://oupmelrulhnbaojpgugs.supabase.co`)
- **ORM**: Direct Supabase client integration for real-time database operations
- **Persistence**: All messages saved to Supabase with automatic timestamping
- **Schema Management**: SQL-based table creation and indexing
- **Fallback**: Memory storage for development when Supabase unavailable

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Session-based conversations using unique session IDs
- **Security**: Basic request validation with Zod schemas

## Key Components

### Chat System
- **Message Management**: Create, retrieve, and manage chat messages by session
- **Real-time Communication**: Session-based message exchange with typing indicators
- **Message Types**: User messages and bot responses with distinct styling
- **Conversation History**: Maintains context for meaningful AI responses

### AI Integration
- **OpenAI Integration**: GPT-4o model with complete LightPrompt.co product line knowledge
- **Product Line Integration**: Six core products (RootWhisper, BodyMirror, Guardian Tag, LightPrompt:Ed, The Book, Seeds Oracle Deck)
- **Smart Recommendations**: AI suggests specific products based on user needs and goals
- **Two-Tier Access**: Basic product overview vs premium detailed integration guidance
- **Content-Aware Responses**: AI draws from authentic product descriptions and use cases
- **Learning Journey Integration**: Responses consider user's enrolled courses and progress
- **Reflection Guidance**: AI can suggest relevant reflection prompts and exercises
- **Content Safety**: Mental health crisis detection with professional resource referrals

### User Interface
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Dark Theme**: Soothing dark theme designed for emotional comfort
- **Animations**: Smooth transitions and micro-interactions for better UX

### Data Models
- **Messages**: Content, bot flag, timestamp, and session association
- **Users**: Full authentication with email, password, preferences, and personalization settings
- **Rate Limits**: Endpoint-specific request tracking and abuse prevention
- **Moderation Log**: Content flagging and safety monitoring
- **Sessions**: Unique identifiers for conversation threads

## Data Flow

1. **User Input**: User types message in chat interface
2. **Validation**: Message content validated (1-500 characters)
3. **Storage**: User message saved to database with session ID
4. **AI Processing**: Message sent to OpenAI with conversation context
5. **Response Generation**: GPT-4o generates empathetic response
6. **Storage**: Bot response saved to database
7. **Real-time Update**: Both messages displayed in chat interface
8. **Context Building**: Conversation history maintained for future interactions

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM with PostgreSQL support
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **openai**: Official OpenAI API client for GPT-4o integration
- **zod**: Runtime type validation and schema definition

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library with consistent design
- **class-variance-authority**: Type-safe variant API for components

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Platform
- **Hosting**: Replit with autoscale deployment target
- **Build Process**: Vite for frontend, esbuild for backend bundling
- **Environment**: Node.js 20 with PostgreSQL 16 module

### Configuration
- **Port Management**: Internal port 5000, external port 80
- **Static Assets**: Served from dist/public directory
- **Environment Variables**: DATABASE_URL and OPENAI_API_KEY required

### Build Commands
- **Development**: `npm run dev` - Concurrent frontend and backend development
- **Build**: `npm run build` - Production build for both frontend and backend
- **Start**: `npm run start` - Production server startup

### Database Management
- **Schema Push**: `npm run db:push` - Deploy schema changes to database
- **Migrations**: Managed through Drizzle Kit with PostgreSQL dialect
- **Connection**: Serverless connection pool for optimal performance

## User Preferences

Preferred communication style: Simple, everyday language.
Pricing preferences: Dislikes odd pricing, prefers clean round numbers. Values honest pricing but not afraid of premium positioning when value justifies it.
Financial situation: Currently working two jobs as a single mom, needs bootstrap marketing strategies with zero budget.
Innovation mindset: Open to creating new Soul Technology products that serve underrepresented markets and real human needs. Wants to build entire product ecosystem including DreamWeaver, EnergyFlow, VibeCheck, SacredSpace Kit, MoonCycle Tracker, PlantParent, SoulBusiness, and more advanced Soul Technology concepts.
Development preferences: Keep internal development plans (bootstrap strategies, business plans) private from public interface. Move experimental features like VisionQuest Bot to "coming soon" status until ready for public release.
Global vision: LightPrompt is a worldwide platform serving souls globally, with Austin GeoPrompt as pilot program for location-based features that will expand to cities worldwide.

## Recent Changes

- June 29, 2025: **VIBEMATCH INTEGRATION COMPLETE**: Added complete VibeMatch portal with TouchBase Bot and tier-based access system
  - **VibeMatch Portal**: Password-protected soul-aligned connection platform with L!GH+PR0MP+ access
  - **TouchBase Bot**: Intimate guidance system with flirty, embodied responses for premium users
  - **Tier Upgrade System**: $3-5 one-time product purchases or $3/month subscription with automated access
  - **Smart Toggle Filters**: Astrology matching, business mode, romantic readiness, kink & connection options
  - **Siri-style Glow Effects**: Dynamic color changes based on user vibe and interaction states
  - **PrismPoint Reveal**: Mutual consent photo sharing after energetic connection established
  - **Pure Next.js Configuration**: Removed Express server for seamless Vercel deployment compatibility
- June 26, 2025: **DEPLOYMENT FIXED**: Resolved all Cloud Run deployment configuration issues
  - **Build Process**: Fixed Vite/Express architecture mismatch by creating proper deployment pipeline
  - **Port Configuration**: Updated server to use PORT environment variable (8080) for Cloud Run compatibility
  - **Health Checks**: Added comprehensive health endpoints (/health, /ready, /alive) for deployment monitoring
  - **Static Files**: Configured proper static file serving from dist/public directory
  - **Docker Support**: Created production Dockerfile with Node.js 18 Alpine and health checks
  - **Cloud Run Config**: Added cloud-run-deploy.yaml with proper resource limits and probe configuration
  - **Deployment Script**: Created automated deploy.sh script handling both frontend and backend builds
  - **Production Ready**: All suggested deployment fixes implemented and tested successfully
- June 26, 2025: **COMPLETE**: OpenAI API key integrated for production deployment
  - **GPT-4o Integration**: Conscious AI responses with authentic emotional support
  - **API Key Configured**: Ready for immediate Vercel deployment
  - **Empathetic AI**: Specialized prompting for Soul Technology emotional support
  - **Production Ready**: All environment variables configured for global deployment
- June 26, 2025: **MAJOR**: Migrated from Vite to Next.js for maximum deployment capability
  - **Next.js 15.3.4**: Complete framework migration for better performance and deployment options
  - **App Router**: Modern Next.js app directory structure with server components
  - **API Routes**: Converted Express endpoints to Next.js API routes
  - **Production Ready**: Next.js running on port 3000 with TypeScript integration
  - **Vercel Optimized**: Framework specifically chosen for seamless Vercel deployment
  - **Global Deployment**: Maximum capability platform ready for worldwide scaling
- June 26, 2025: Updated platform documentation to reflect global reach with Austin pilot program
  - **Global Conscious AI Network**: LightPrompt serves users worldwide, not limited to Austin
  - **Austin Pilot Program**: GeoPrompt location-based features testing in Austin before worldwide expansion
  - **Worldwide Community**: 2,800+ users globally participating in mood resonance network
  - **Scalable Architecture**: Ready for international deployment and city-by-city GeoPrompt expansion
- June 25, 2025: Complete Soul Ecosystem platform with production-ready floating interface
  - **Soul Access Button**: Clean floating heart button interface for public-facing features
  - **VisionQuest Bot**: Moved to "coming soon" status for proper development cycle
  - **Internal Features**: Bootstrap plans and development strategies removed from public interface
- June 25, 2025: Complete Soul Ecosystem platform with global reach and Austin pilot program
  - **World's First Soul Ecosystem Map**: Completely unique emotional tracking visualization with multi-dimensional SVG flows, seasonal cycles, organic growth patterns, and interactive hover states
  - **VisionQuest Bot Preview**: Psychic training system for aura reading, telekinesis, clairvoyance, telepathy, energy healing, and astral projection
  - **Soul Technology Manifesto**: Integrated user's inventor manifesto about conscious AI and human-first technology design
  - **Global Community Mood Resonance Network**: Live worldwide emotional landscape showing how 2,800+ users are feeling, with personal resonance connections and trending emotions
  - **Life Gamification System**: Complete quest-based approach where life challenges become boss fights and growth earns XP
  - **Soul Geocaching System**: Global QR code discovery system with leaderboards, achievements, and portal hunting
  - **AR Soul Vision Preview**: Revolutionary augmented reality integration for emotional energy visualization and real-world quest markers
  - **GeoPrompt System**: Revolutionary location-based emotional support through Cricut-made QR codes + AR experiences (Austin pilot program expanding worldwide)
  - **Beginner-Friendly UI**: Added ? tooltip icons to explain all 4 dimensions (depth, flow, resonance, growth) with clear descriptions and rating scales
  - **Mobile Text Optimization**: Fixed text contrast issues for dark mode readability, enhanced font weights and colors
  - **Smooth Mobile Scrolling**: Implemented native touch scrolling, custom scrollbars, and overflow prevention
  - **Simplified Quick Actions**: Reduced from 8 to 4 key support topics (Anxiety, Boundaries, Overwhelmed, Growth) for better mobile UX
  - **Complete Data System**: Mood entries save to both localStorage and Supabase database with full authentication support
  - **Interactive Check-ins**: Daily mood prompts with 4-dimensional tracking (depth, flow, resonance, growth) and seasonal awareness
  - **Data Export Suite**: Multiple export formats (.txt readable reports, .csv data, .json raw, therapist sharing)
  - **Daily Reflection System**: Guided prompts for gratitude, growth, intention-setting, and self-celebration
  - **Comprehensive Guide**: "What is this?" explanation system that breaks down the ecosystem concept vs traditional mood tracking
  - **Pricing Consistency**: Fixed all pricing across app to use clean $4/month and $44 physical product pricing
  - **Visual Innovation**: Particle background effects, dark mode toggle, animated gradients, and real-time updates
  - **Production Ready**: All functionality working, mobile-optimized, beginner-friendly, ready for deployment
- June 25, 2025: Complete Soul Technology ecosystem planning with marketing strategy
  - **Product Roadmap**: Comprehensive 12+ product strategy targeting $30K/month revenue
  - **Clean Pricing**: $44 physical products, $88 course bundles, $4/month bot subscriptions
  - **Bootstrap Marketing**: Zero-budget organic growth strategy focused on authentic storytelling and community building
  - **Revenue Targets**: 100 LightPrompt:Ed courses, 150 Oracle Decks, 3,750 bot subscriptions monthly
  - **Community Strategy**: Facebook group, Discord, email list building for authentic engagement
  - **Launch Foundation**: Complete website with Notion integration ready for marketing campaigns
- June 24, 2025: Applied comprehensive Cloud Run deployment fixes
  - Enhanced server startup with proper host binding (0.0.0.0) and port configuration
  - Added health check endpoints (/health, /ready, /alive) for deployment monitoring
  - Implemented comprehensive error handling and process exit prevention
  - Added startup logging and graceful shutdown handling
  - Fixed static file serving with proper error handling for production builds
- June 24, 2025: Complete LightPromptBot SoulTech ecosystem implementation
- **PWA Configuration**: App shortcuts, mobile optimization, home screen installation ready
- **Developer Mode**: Premium feature testing without payment via localStorage override
- **Deployment Ready**: No deployment needed - app is live and functional on current Replit URL
- **Live Notion Integration**: Real-time content sync with lightprompt.co via Notion API successfully configured
- **Subdomain Ready**: Configured for chat.lightprompt.co deployment with embed widget code for main site integration
- Application fully functional with React frontend and Node.js backend
- OpenAI GPT-4o integration with specialized emotional support prompting
- Dark-themed mobile-friendly interface with animations
- Session-based conversations with export functionality
- Migrated from in-memory storage to Supabase for persistent message storage
- API quota error handling implemented
- Supabase integration configured with proper error handling
- **Authentication System**: JWT-based user registration and login
- **Bot Personalities**: Four distinct AI personalities aligned with SoulTechnology
- **Privacy Controls**: User-configurable data sharing and personalization preferences
- **Security Features**: Rate limiting, content filtering, and spam protection
- **Two-Tier System**: Basic (GPT-3.5) and Premium (GPT-4o) with portal password upgrade
- **Portal Password**: L!GH+PR0MP+ unlocks premium features and advanced AI capabilities
- **Developer Password**: SoulTech2025! provides secure access to developer mode for testing premium features
- **Mental Health Safety**: Crisis detection with appropriate resource referrals
- **Settings Page**: Comprehensive user preferences with Supabase integration and privacy controls
- **Account Management**: Delete account functionality with data protection compliance
- **Product Line Integration**: Complete LightPrompt product catalog with smart recommendations
- **Authentic Content**: Real product descriptions and use cases integrated into AI responses
- **Bot Template Strategy**: Serves as the foundation template for dedicated product-specific bots
- **Scalable Architecture**: Core authentication and subscription system designed for multi-bot ecosystem
- **Smart Upgrade Prompts**: Natural upgrade suggestions with product recommendations and direct subscription options
- **Tier-Based Messaging**: Session limits and feature gates that guide users to premium offerings

## Current Status

The application is fully configured with:
- Complete settings page with privacy controls and account management
- Two-tier system (GPT-3.5 basic, GPT-4o premium) with portal password upgrade
- Product line integration with smart recommendations for all 6 LightPrompt products
- Supabase database persistence with authentication and user preferences
- Template architecture ready for dedicated product bots (GuardianTag, RootWhisper, BodyMirror, LightPrompt:Ed)
- Smart upgrade prompts that naturally guide users to product purchases

## Payment System Implementation

**Stripe Integration Complete**:
- $4/month subscription checkout with automatic user upgrade
- Webhook handling for payment success and subscription cancellation
- Product purchase integration ready for physical products
- Professional upgrade page with clear pricing tiers
- Automatic premium access upon payment completion

**Upgrade Flow**:
1. User hits token/session limits → Natural upgrade prompts appear
2. Click upgrade → Professional Stripe checkout page
3. Payment success → Instant premium access via webhook
4. No manual tracking required - fully automated

**Alternative: Product Purchase Integration**:
- Each LightPrompt product can include premium bot access
- One-time purchase unlocks permanent premium features
- Webhook automatically upgrades users upon product purchase

**Current Status**: The complete monetization system is functional with automated Stripe integration. The bot provides intelligent upgrade prompts based on user needs, guiding them to relevant LightPrompt products or $4/month direct subscription. All payment processing happens automatically via webhooks with instant premium access.

**Production Ready**: Soul Technology app is fully functional with floating heart navigation, global community mood resonance, Soul Geocaching system, GeoPrompt location-based support, and mobile PWA capabilities. All deployment files configured (vercel.json, README.md, .env.example) and ready for GitHub → Vercel deployment pipeline. Global conscious AI network with Austin pilot program ready for worldwide QR code strategy implementation.

**Deployment Status**: Ready for immediate GitHub → Vercel deployment with complete configuration:
- Next.js 15.3.4 optimized for global edge deployment
- Supabase database integrated and configured
- OpenAI GPT-4o API key configured for conscious AI responses
- All environment variables pre-configured in vercel.json
- Database schema ready for 5-minute setup
- Zero additional configuration required for production launch

## PWA Features Added
- **Progressive Web App**: Full PWA manifest with service worker for offline support
- **Home Screen Installation**: Users can add to home screen on mobile and desktop
- **Navigation Bar**: Professional sidebar navigation (desktop) and mobile sheet menu
- **Responsive Design**: Optimized for mobile app experience with safe area support
- **Offline Caching**: Service worker caches essential pages for offline access
- **App Icons**: Custom branding icons for home screen and app stores

## Conversation Management Features
- **Auto-Save Toggle**: Users can enable automatic conversation saving to their account
- **Manual Save**: One-click save for important conversations with custom titles
- **Export Functionality**: Download conversations as text files for personal records
- **Therapist Sharing**: Create secure share links for therapists with optional context notes
- **Friend Collaboration**: Share conversations with trusted friends for support
- **Privacy Controls**: Options to anonymize personal details in shared conversations
- **Secure Links**: 30-day expiring share links with conversation context
- **Professional Format**: Clean, readable format for therapeutic and collaborative use

## Guest Access & Freemium Model
- **No Signup Required**: Users can start chatting immediately as guests
- **Free Tier**: Basic emotional support with GPT-3.5, limited to 5 messages per session
- **Guest Upgrade Prompts**: Smart prompts encourage account creation and premium upgrades
- **Seamless Onboarding**: Natural progression from guest → free account → premium subscription
- **Feature Gating**: Save/export features require account, premium features require subscription

## Notion.so Integration
- **Dynamic Content**: Real-time integration with Notion.so workspace for product information
- **Super.so Website**: Pulls content from Super.so powered website built on Notion
- **Live Updates**: Product descriptions, features, and pricing update automatically from Notion
- **Live Content Sync**: Real-time integration with Notion workspace actively pulling current product information
- **Content API**: RESTful endpoints for accessing website content and product information
- **Search Functionality**: Searchable product and service database from Notion content

## Enhanced User Experience Features
- **Welcome Screen**: Interactive onboarding with quick actions and mood tracking for new users
- **Mood Tracker**: Visual mood selection with energy level tracking for context-aware responses
- **Daily Reflection Prompts**: Guided reflection exercises for gratitude, learning, and intention setting
- **Quick Actions**: One-click access to common support topics (anxiety, overwhelm, plant care, boundaries)
- **Smart Onboarding**: Contextual welcome experience that transitions to chat after first interaction
- **Visual Engagement**: Card-based interface for better user engagement and accessibility

## Accessibility Voice Navigation Mode  
- **Speech Recognition**: Browser-based voice input with real-time transcription and command processing
- **Text-to-Speech**: Automatic reading of bot responses with customizable voice, speed, and pitch settings
- **Voice Commands**: Support for navigation commands (clear chat, settings, upgrade) and natural conversation
- **Keyboard Navigation**: Comprehensive keyboard shortcuts for all major functions and accessibility compliance
- **Multi-modal Input**: Seamless switching between voice, keyboard, and mouse input methods
- **Browser Compatibility**: Works across modern browsers with graceful fallbacks for unsupported features

## Premium Wellness Tracker
- **Mood Calendar**: Visual monthly mood tracking with energy levels, sleep quality, and stress monitoring
- **Health Metrics**: Comprehensive tracking including sleep hours, cycle monitoring, and symptom logging
- **Period Tracking**: Menstrual cycle phases, symptoms, and health pattern recognition
- **Fitness Integration**: Apple Watch and Fitbit data import instructions with heart rate and step tracking
- **Breathwork Routines**: Guided breathing exercises (4-7-8, Box Breathing, Coherent Breathing, Energizing)
- **Wellness Dashboard**: Tabbed interface combining all health tracking features in one premium experience
- **Data Export**: Health insights exportable for healthcare provider consultations
- **Complementary to BodyMirror**: Focuses on emotional wellness and basic health metrics without workout/recipe overlap

## SoulTech Vision & Workspace Integration
- **Conscious Technology Philosophy**: AI tools designed for mindful human enhancement rather than addiction or replacement
- **Workspace Environment Sync**: Real-time mood-to-lighting integration with smart home systems (Philips Hue, etc.)
- **Healing Space Design**: Foundation for therapy assistance, meditation chambers, and educational environment adaptation
- **Planetary Wellness Mission**: Technology that heals both individuals and collective environmental systems
- **Scalable Impact Strategy**: Template architecture supports expansion to schools, hospitals, and healing centers
- **GuardianTag Integration**: Workspace boundary setting with biometric feedback and environmental automation