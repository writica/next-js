import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

// GET request to check if a user exists with the given wallet address
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');
    
    if (!walletAddress) {
      return NextResponse.json({ 
        success: false,
        message: 'Wallet address is required'
      }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        walletAddress: walletAddress
      }
    });

    return NextResponse.json({ 
      success: true,
      exists: !!user,
      user: user
    });
  } catch (error) {
    console.error('Error checking user:', error);
    return NextResponse.json({ 
      success: false,
      message: 'An error occurred while checking user'
    }, { status: 500 });
  }
}

// POST request to create a new user
export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const name = formData.get('name');
    const email = formData.get('email');
    const bio = formData.get('bio');
    const walletAddress = formData.get('walletAddress');
    const image = formData.get('image');
    
    // Validate required fields
    if (!walletAddress) {
      return NextResponse.json({ 
        success: false, 
        message: 'Wallet address is required'
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { walletAddress }
    });

    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        message: 'User with this wallet address already exists'
      }, { status: 400 });
    }

    let imagePath = null;
    
    // Process image upload if provided
    if (image && image.size > 0) {
      const fileExtension = image.type.split('/')[1];
      const fileName = `${uuidv4()}.${fileExtension}`;
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      
      // Save the file
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await writeFile(`${uploadDir}/${fileName}`, buffer);
      
      imagePath = `/uploads/${fileName}`;
    }

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        bio,
        walletAddress,
        image: imagePath
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'User registered successfully',
      user
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred while registering the user'
    }, { status: 500 });
  }
}