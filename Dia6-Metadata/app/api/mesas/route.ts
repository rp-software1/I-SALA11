import { NextResponse } from 'next/server';
import { mesas } from '../data';

export async function GET() {
  return NextResponse.json(mesas);
}
