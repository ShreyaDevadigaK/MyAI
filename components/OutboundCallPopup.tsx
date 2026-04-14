'use client'

import { useState, useEffect } from 'react'
import { X, Phone, Plus, Trash2 } from 'lucide-react'
import { 
  getStoredPhoneNumbers, 
  savePhoneNumber, 
  deletePhoneNumber, 
  validatePhoneNumber,
  formatPhoneNumber,
  type StoredPhoneNumber 
} from '@/lib/phone-storage'
import { Button } from '@/components/ui/button'

interface OutboundCallPopupProps {
  isOpen: boolean
  onClose: () => void
  onNumberSelect: (phoneNumber: string) => void
}

export default function OutboundCallPopup({ isOpen, onClose, onNumberSelect }: OutboundCallPopupProps) {
  const [phoneInput, setPhoneInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [storedNumbers, setStoredNumbers] = useState<StoredPhoneNumber[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setStoredNumbers(getStoredPhoneNumbers())
    }
  }, [isOpen])

  const handleAddNumber = () => {
    setError('')
    const trimmedPhone = phoneInput.trim()
    const trimmedName = nameInput.trim()

    if (!trimmedPhone) {
      setError('Please enter a phone number')
      return
    }

    if (!validatePhoneNumber(trimmedPhone)) {
      setError('Please enter a valid phone number')
      return
    }

    savePhoneNumber(trimmedPhone, trimmedName || undefined)
    setStoredNumbers(getStoredPhoneNumbers())
    setPhoneInput('')
    setNameInput('')
  }

  const handleDeleteNumber = (id: string) => {
    deletePhoneNumber(id)
    setStoredNumbers(getStoredPhoneNumbers())
  }

  const handleNumberSelect = (phoneNumber: string) => {
    onNumberSelect(phoneNumber)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/30">
          <h2 className="text-xl font-semibold text-gray-900">Outbound Call</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Add new number form */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Add New Number</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full border border-white/60 bg-white/80 rounded-2xl px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Name (optional)"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full border border-white/60 bg-white/80 rounded-2xl px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <Button
              onClick={handleAddNumber}
              disabled={!phoneInput.trim()}
              className="w-full bg-purple-600 text-white hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Number
            </Button>
          </div>

          {/* Saved numbers list */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Saved Numbers</h3>
            {storedNumbers.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No numbers saved yet
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {storedNumbers.map((number) => (
                  <div
                    key={number.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {formatPhoneNumber(number.phoneNumber)}
                          </p>
                          {number.name && (
                            <p className="text-xs text-gray-500 truncate">
                              {number.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleNumberSelect(number.phoneNumber)}
                      >
                        Call
                      </Button>
                      <button
                        onClick={() => handleDeleteNumber(number.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
