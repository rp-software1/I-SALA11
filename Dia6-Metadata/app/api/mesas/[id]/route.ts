import { NextResponse } from 'next/server';
import { mesas } from '../../data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const mesa = mesas.find((item) => item._id === id);

  if (!mesa) {
    return NextResponse.json({ error: 'Mesa no encontrada' }, { status: 404 });
  }

  return NextResponse.json(mesa);
}
