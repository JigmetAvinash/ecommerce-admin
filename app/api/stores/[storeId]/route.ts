//** IMPORTANT API DOCUMENT */
//Imports
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//Update Store Name 
export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string } }
    //! DO NOT DELETE _REQ (ABOVE LINE). CHECK LINE 47 FOR MORE DETAILS
){
    try{
        const { userId } = auth()
        const body = await req.json();

        const { name } = body;
        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if(!name){
            return new NextResponse("NAME IS REQUIRED. !NULL VALUE",{status: 400} );
        }
        if(!params.storeId){
            return new NextResponse("Store ID not Found/Required", {status: 400})
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        });

        return NextResponse.json(store);
    }catch (error){
        console.error('[STORE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
};

//Delete Store 

export async function DELETE (
    //Params are always taken as second parameter, that's why we are using PARAMS as second even if request is not being used
    _req: Request,
    //! DO NOT DELETE _REQ (ABOVE LINE). CHECK LINE 47 FOR MORE DETAILS
    { params }: { params: { storeId: string } }
){
    try{
        const { userId } = auth()
        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if(!params.storeId){
            return new NextResponse("Store ID not Found/Required", {status: 400})
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            },
        });

        return NextResponse.json(store);
    }catch (error){
        console.error('[STORE_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
};
