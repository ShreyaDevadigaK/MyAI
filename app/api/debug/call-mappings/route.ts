import { NextRequest, NextResponse } from 'next/server'
import { getAllMappings, clearAllMappings } from '@/lib/call-mappings-persistent'

export async function GET(request: NextRequest) {
  try {
    const mappings = getAllMappings();
    return NextResponse.json({
      mappings: mappings,
      count: mappings.length
    });
  } catch (error) {
    console.error('Error getting call mappings:', error);
    return NextResponse.json({ error: 'Failed to get mappings' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    clearAllMappings();
    return NextResponse.json({ message: 'All call mappings cleared' });
  } catch (error) {
    console.error('Error clearing call mappings:', error);
    return NextResponse.json({ error: 'Failed to clear mappings' }, { status: 500 });
  }
}
