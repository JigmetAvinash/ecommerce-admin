//** IMPORTANT API DOCUMENT */
//Imports
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//Billboard GET
export async function GET (
    //Params are always taken as second parameter, that's why we are using PARAMS as second even if request is not being used
    _req: Request,
    //! DO NOT DELETE _REQ (ABOVE LINE). CHECK ABOVE COMMENTS FOR MORE DETAILS
    { params }: { params: { billboardId: string } }
){
    try{

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
            },
        });

        return NextResponse.json(billboard);
    }catch (error){
        console.error('[BILLBOARD_GET]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
};

//BillBoard UPDATE
export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
    //! DO NOT DELETE _REQ (ABOVE LINE). CHECK LINE 47 FOR MORE DETAILS
){
    try{
        const { userId } = auth()
        const body = await req.json();

        const { label, imageUrl } = body;

        const { name } = body;
        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if(!label){
            return new NextResponse("Label IS REQUIRED",{status: 400} );
        }
        if(!imageUrl){
            return new NextResponse("Image is REQUIRED",{status: 400} );
        }
        if(!params.billboardId){
            return new NextResponse("Billboard ID/Billboard is requried", {status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status: 403})
        }

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId,
            },
            data: {
                label,
                imageUrl
            }
        });

        return NextResponse.json(billboard);
    }catch (error){
        console.error('[BILLBOARD_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
};

//Billboard DELETE

export async function DELETE (
    //Params are always taken as second parameter, that's why we are using PARAMS as second even if request is not being used
    _req: Request,
    //! DO NOT DELETE _REQ (ABOVE LINE). CHECK ABOVE COMMENTS FOR MORE DETAILS
    { params }: { params: { storeId: string, billboardId: string } }
){
    try{
        const { userId } = auth()
        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if(!params.billboardId){
            return new NextResponse("Billboard ID not Found", {status: 400})
        }

        const sotreByUserId = await prismadb.store.findFirst({
            where:{
                id: params.storeId,
                userId,
            }
        })

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId,
            },
        });

        return NextResponse.json(billboard);
    }catch (error){
        console.error('[BILLBOARD_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
};
