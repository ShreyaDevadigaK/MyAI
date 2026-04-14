export class IntentDetector {
  static readonly SCHEDULING_KEYWORDS = {
    schedule: ['schedule', 'book', 'appointment', 'meeting', 'set up', 'arrange'],
    book: ['book', 'reserve', 'make reservation', 'booking'],
    reschedule: ['reschedule', 'change', 'move', 'postpone', 'new time', 'new date'],
    cancel: ['cancel', 'remove', 'delete', 'call off', 'cancel appointment']
  };

  static detectIntent(message: string): {
    type: string | null;
    confidence: number;
    keywords: string[];
  } {
    const lowerMessage = message.toLowerCase();
    let bestMatch = { type: null as string | null, confidence: 0, keywords: [] as string[] };

    for (const [intentType, keywords] of Object.entries(this.SCHEDULING_KEYWORDS)) {
      const matchedKeywords = keywords.filter(keyword =>
        lowerMessage.includes(keyword.toLowerCase())
      );
      
      if (matchedKeywords.length > 0) {
        const confidence = Math.min(matchedKeywords.length * 0.3, 1.0);
        if (confidence > bestMatch.confidence) {
          bestMatch = {
            type: intentType,
            confidence,
            keywords: matchedKeywords
          };
        }
      }
    }

    return bestMatch;
  }

  static extractEntities(message: string): {
    date?: string | null;
    time?: string | null;
    service?: string | null;
  } {
    const entities: { date?: string | null; time?: string | null; service?: string | null } = {
      date: null,
      time: null,
      service: null
    };

    // Date extraction
    const datePatterns = [
      /\b(today|tomorrow|yesterday)\b/i,
      /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
      /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/i,
      /\b(\d{1,2})-(\d{1,2})-(\d{4})\b/i
    ];

    // Time extraction
    const timePatterns = [
      /\b(\d{1,2}):?(\d{2})?\s*(am|pm)\b/i,
      /\b(\d{1,2})\s*(o'clock)\b/i
    ];

    // Service extraction (basic)
    const serviceKeywords = ['consultation', 'meeting', 'call', 'appointment', 'demo', 'session'];

    for (const pattern of datePatterns) {
      const match = message.match(pattern);
      if (match) {
        entities.date = match[0];
        break;
      }
    }

    for (const pattern of timePatterns) {
      const match = message.match(pattern);
      if (match) {
        entities.time = match[0];
        break;
      }
    }

    for (const service of serviceKeywords) {
      if (message.toLowerCase().includes(service)) {
        entities.service = service;
        break;
      }
    }

    return entities;
  }
}
