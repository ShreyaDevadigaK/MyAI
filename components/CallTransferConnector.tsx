// // 'use client'

// // export class CallTransferService {
// //   static getTransferNumbers(): string[] {
// //     const savedTransfers = localStorage.getItem('callTransfers')
// //     return savedTransfers ? JSON.parse(savedTransfers) : []
// //   }

// //   static setTransferNumbers(numbers: string[]): void {
// //     localStorage.setItem('callTransfers', JSON.stringify(numbers))
// //   }

// //   static addTransferNumber(number: string): void {
// //     const current = this.getTransferNumbers()
// //     if (!current.includes(number)) {
// //       this.setTransferNumbers([...current, number])
// //     }
// //   }

// //   static removeTransferNumber(number: string): void {
// //     const current = this.getTransferNumbers()
// //     this.setTransferNumbers(current.filter(n => n !== number))
// //   }
// // }




'use client'

import { useState, useEffect } from 'react'

export default function CallTransfers() {
  const [phoneInput, setPhoneInput] = useState('')
  const [transfers, setTransfers] = useState<string[]>([])

  // Load transfers from localStorage on component mount
  useEffect(() => {
    const savedTransfers = localStorage.getItem('callTransfers')
    if (savedTransfers) {
      setTransfers(JSON.parse(savedTransfers))
    }
  }, [])

  // Save transfers to localStorage whenever transfers change
  useEffect(() => {
    localStorage.setItem('callTransfers', JSON.stringify(transfers))
  }, [transfers])

  const handleAddTransfer = () => {
    const trimmed = phoneInput.trim()
    if (trimmed && !transfers.includes(trimmed)) {
      setTransfers([...transfers, trimmed])
      setPhoneInput('')
    }
  }

  const handleDelete = (phone: string) => {
    setTransfers(transfers.filter(t => t !== phone))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold mb-6 items-center">📲Call Transfer</h1>
      <p className="text-sm text-gray-600 mb-4">Configure when and how to transfer calls</p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          value={phoneInput}
          onChange={(e) => setPhoneInput(e.target.value)}
          placeholder="Enter phone number"
          className="flex-1 border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleAddTransfer}
          className="bg-purple-600 text-white text-sm px-4 py-2 rounded hover:bg-purple-700"
        >
          Add Call Transfer
        </button>
      </div>

      {transfers.length === 0 ? (
        <div className="border rounded p-6 text-center text-gray-400 text-sm">
          No call transfers found
        </div>
      ) : (
        <table className="w-full text-sm border rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border-b">Phone Number</th>
              <th className="text-left p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((phone, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-3 border-b">{phone}</td>
                <td className="p-3 border-b">
                  <button
                    onClick={() => handleDelete(phone)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  )
}


