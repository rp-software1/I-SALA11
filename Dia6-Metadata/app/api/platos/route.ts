import { NextResponse } from 'next/server';
import { platos } from '../data';

export async function GET() {
  return NextResponse.json(platos);
}
