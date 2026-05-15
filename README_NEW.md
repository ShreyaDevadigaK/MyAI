# 📱 Dialzara - AI-Powered Call Booking System

An intelligent call handling system that uses AI to schedule appointments automatically through phone calls.

## 🎯 What It Does

1. **Customer Calls** → Through Twilio
2. **AI Assistant Answers** → Ultravox voice AI
3. **Conversation** → AI understands customer needs
4. **Booking** → AI schedules appointment automatically
5. **Confirmation** → Data saved to database + Google Calendar + SMS sent

## 🔧 Key Features

- ✅ AI-powered call handling (Ultravox)
- ✅ Automatic appointment scheduling
- ✅ Google Calendar integration
- ✅ Google Sheets logging
- ✅ SMS notifications to customers
- ✅ Supabase database storage
- ✅ User authentication (Clerk)
- ✅ Dashboard with calendar view

## 🗄️ Data Storage

When a customer books:
- **Supabase** → Event stored in database
- **Google Calendar** → Event synced to user's calendar
- **Google Sheets** → Activity logged
- **SMS** → Confirmation sent to customer

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📋 Environment Variables Required

```
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
ULTRAVOX_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

## 📚 Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Next.js API routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Clerk
- **Voice**: Twilio + Ultravox AI
- **Integrations**: Google Calendar, Google Sheets

## 📖 Testing

See documentation files for Postman testing:
- `POSTMAN_QUICK_GUIDE.md` - API testing guide
- `TESTING_CHECKLIST.md` - Verification steps
