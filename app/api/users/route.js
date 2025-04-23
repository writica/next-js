import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma/client';

// GET /api/users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { 
        articles: true,
        rewards: true 
      }
    });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/users
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data
    });
    
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user', details: error.message },
      { status: 500 }
    );
  }
}