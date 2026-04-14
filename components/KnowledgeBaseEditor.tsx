'use client'

import { useRef, useState, useEffect } from 'react'
import { useAgentPrompt } from '@/context/AgentPromptContext'

type KnowledgeItem = {
  id: number
  sourceType: 'Text' | 'URL' | 'File'
  text: string
  dateCreated: string
  active: boolean
}

export default function KnowledgeBaseEditor() {
  const { knowledgeBase, setKnowledgeBase } = useAgentPrompt()

  const [showAddTextModal, setShowAddTextModal] = useState(false)
  const [showUrlModal, setShowUrlModal] = useState(false)
  const [newText, setNewText] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Removed useEffect to prevent infinite loop causing maximum update depth exceeded error
  // useEffect(() => {
  //   if (knowledgeBase.length === 0) {
  //     setKnowledgeBase([])
  //   }
  // }, [knowledgeBase, setKnowledgeBase])

  const addItem = (type: KnowledgeItem['sourceType'], value: string) => {
    const newItem: KnowledgeItem = {
      id: Date.now(),
      sourceType: type,
      text: value,
      dateCreated: new Date().toLocaleDateString(),
      active: true,
    }
    setKnowledgeBase((prev: string[]) => [newItem.text, ...prev])
  }

  const handleAddText = () => {
    if (newText.trim()) {
      addItem('Text', newText.trim())
      setNewText('')
      setShowAddTextModal(false)
    }
  }

  const handleFetchUrl = () => {
    if (newUrl.trim()) {
      addItem('URL', newUrl.trim())
      setNewUrl('')
      setShowUrlModal(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      addItem('File', file.name)
    }
  }

  return (
    <>
      {/* Buttons */}
      <div>
        
        <p className="text-sm text-gray-600 mb-4">Manage your agent's knowledge sources</p>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setShowAddTextModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
          >
            Add Text
          </button>
          <button
            onClick={() => setShowUrlModal(true)}
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 text-sm"
          >
            Fetch URL
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm"
          >
            Upload File
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 font-medium border-b">
            <tr>
              <th className="px-4 py-2">Source Type</th>
              <th className="px-4 py-2">Text</th>
              <th className="px-4 py-2">Date Created</th>
              <th className="px-4 py-2">Active</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {knowledgeBase.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  Nothing found
                </td>
              </tr>
            ) : (
              knowledgeBase.map((text, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">Text</td>
                  <td className="px-4 py-2 truncate max-w-[300px]">{text}</td>
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Yes
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() =>
                        setKnowledgeBase((prev: string[]) => prev.filter((_, i) => i !== index))
                      }
                      className="text-red-600 hover:underline text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Text Modal */}
      {showAddTextModal && (
        <Modal
          title="Add Text to Knowledge Base"
          value={newText}
          placeholder="Enter text to add to the knowledge base..."
          onChange={setNewText}
          onCancel={() => setShowAddTextModal(false)}
          onConfirm={handleAddText}
          confirmLabel="Add Text"
        />
      )}

      {/* Fetch URL Modal */}
      {showUrlModal && (
        <Modal
          title="Fetch URL for Knowledge Base"
          value={newUrl}
          placeholder="Enter URL to fetch..."
          onChange={setNewUrl}
          onCancel={() => setShowUrlModal(false)}
          onConfirm={handleFetchUrl}
          confirmLabel="Fetch URL"
        />
      )}
    </>
  )
}

type ModalProps = {
  title: string
  value: string
  placeholder: string
  onChange: (val: string) => void
  onCancel: () => void
  onConfirm: () => void
  confirmLabel: string
}

function Modal({
  title,
  value,
  placeholder,
  onChange,
  onCancel,
  onConfirm,
  confirmLabel,
}: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border rounded-md p-3 text-sm focus:ring-purple-500 focus:outline-none"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!value.trim()}
            className={`px-4 py-2 text-sm text-white rounded ${
              value.trim()
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-purple-300 cursor-not-allowed'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
