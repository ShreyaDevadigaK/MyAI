import { CallTransferService } from './call-transfer-service'

export async function initiateCallWithTransfers(
  prompt: string,
  phoneNumber: string,
  voice?: string,
  customTransferNumbers?: string[],
  greeting?: string
) {
  const transferNumbers = customTransferNumbers || CallTransferService.getTransferNumbers()
  
  const response = await fetch('/api/call', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      phoneNumber,
      voice,
      transferNumbers,
      greeting
    })
  })

  if (!response.ok) {
    throw new Error('Failed to initiate call')
  }

  return response.json()
}
