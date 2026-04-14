const callMappings = new Map<string, string>()

export const storeCallMapping = (ultravoxId: string, twilioSid: string) => {
  callMappings.set(ultravoxId, twilioSid)
}

export const getCallMapping = (ultravoxId: string): string | undefined => {
  return callMappings.get(ultravoxId)
}