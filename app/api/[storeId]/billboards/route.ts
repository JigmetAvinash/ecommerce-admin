import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string }}
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label  is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("An image is required", { status: 400 });
    }

    if(!params.storeId) {
      return new NextResponse("No Store Found", { status: 404 });
    }

    const storeByUserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!storeByUserId) {
        return new NextResponse("Unauthorized. Updating someone else's store comes under a criminal offence. You may get legal charges and potential jail time", {status: 403})
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
//**Get Function */
export async function GET(
  req: Request,
  { params }: { params: { storeId: string }}
) {
  try {

    if(!params.storeId) {
      return new NextResponse("No Store Found", { status: 404 });
    }


    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(billboards);
  } catch (error) {
    console.error('[BILLBOARDS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};