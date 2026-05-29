import { NextResponse } from 'next/server';
import { platos } from '../../data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const plato = platos.find((item) => item._id === id);

  if (!plato) {
    return NextResponse.json({ error: 'Plato no encontrado' }, { status: 404 });
  }

  return NextResponse.json(plato);
}
