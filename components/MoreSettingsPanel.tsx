'use client'

import React, { useState } from 'react'

type ToggleProps = {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const ToggleSwitch: React.FC<ToggleProps> = ({
  label,
  description,
  checked,
  onChange,
}) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
    <div className="flex flex-col">
      <span className="text-lg font-medium text-gray-900">{label}</span>
      {description && (
        <span className="text-sm text-gray-500 mt-1">{description}</span>
      )}
    </div>
    <label
      htmlFor={`${label.toLowerCase().replace(/\s/g, '-')}-toggle`}
      className="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id={`${label.toLowerCase().replace(/\s/g, '-')}-toggle`}
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
    </label>
  </div>
)

const MoreSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [textNotifications, setTextNotifications] = useState(false)
  const [agentTerminateCalls, setAgentTerminateCalls] = useState(false)
  const [addFillerAudio, setAddFillerAudio] = useState(false)
  const [googleCalendarIntegration, setGoogleCalendarIntegration] =
    useState(false)

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [emailSaved, setEmailSaved] = useState(false)
  const [phoneSaved, setPhoneSaved] = useState(false)

  const handleEmailSave = () => {
    if (email.trim()) {
      setEmailSaved(true)
      setTimeout(() => setEmailSaved(false), 2000)
    }
  }

  const handlePhoneSave = () => {
    if (phone.trim()) {
      setPhoneSaved(true)
      setTimeout(() => setPhoneSaved(false), 2000)
    }
  }

  const handleGoogleCalendarIntegration = () => {
    // Redirect to Google OAuth 2.0 consent screen
    const clientId = '693116352894-qhp36310h5lgoh6vkhsbbal2qaeej9t0.apps.googleusercontent.com' // Replace with your client ID
    const redirectUri = `${window.location.origin}/api/google-calendar/oauth`
    const scope = encodeURIComponent('https://www.googleapis.com/auth/calendar')
    const responseType = 'code'
    const accessType = 'offline'
    const includeGrantedScopes = 'true'
    const state = 'state_parameter_passthrough_value' // Optional, can be used for CSRF protection

    const oauth2Url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&include_granted_scopes=${includeGrantedScopes}&state=${state}`

    window.location.href = oauth2Url
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w">
        <h1 className="text-2xl font-semibold mb-6 items-center">⚙️ More Settings</h1>
        <p className="text-gray-600 mb-6">Configure additional agent settings</p>

        <div className="space-y-4">
          {/* Email Notification Toggle */}
          <ToggleSwitch
            label="Email Notifications"
            description=""
            checked={emailNotifications}
            onChange={setEmailNotifications}
          />
          {emailNotifications && (
            <div className="pl-4 pr-2 pb-4 space-y-2">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleEmailSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Save
              </button>
              {emailSaved && (
                <p className="text-green-600 text-sm">Email saved successfully!</p>
              )}
            </div>
          )}

          {/* Text Notification Toggle */}
          <ToggleSwitch
            label="Text Notifications"
            description=""
            checked={textNotifications}
            onChange={setTextNotifications}
          />
          {textNotifications && (
            <div className="pl-4 pr-2 pb-4 space-y-2">
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handlePhoneSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Save
              </button>
              {phoneSaved && (
                <p className="text-green-600 text-sm">Phone number saved!</p>
              )}
            </div>
          )}

          <ToggleSwitch
            label="Let Agent Terminate Calls"
            description="Allow the AI agent to end calls when appropriate"
            checked={agentTerminateCalls}
            onChange={setAgentTerminateCalls}
          />
          <ToggleSwitch
            label="Add Filler Audio"
            description="Your AI agent will play keyboard typing sounds instead of silence while it thinks of its response."
            checked={addFillerAudio}
            onChange={setAddFillerAudio}
          />
          <ToggleSwitch
            label="Google Calendar Integration"
            description="Allow the agent to access and manage your Google Calendar for scheduling."
            checked={googleCalendarIntegration}
            onChange={setGoogleCalendarIntegration}
          />

          {googleCalendarIntegration && (
            <div className="pl-4 pr-2 pb-4 space-y-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                onClick={handleGoogleCalendarIntegration}
              >
                Click here to integrate calendar
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default MoreSettings
