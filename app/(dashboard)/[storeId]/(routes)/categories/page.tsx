import { format } from "date-fns";
import { CategoryColumn } from "./components/columns";
import { BillboardClient } from "./components/Billboard-Client";
import prismadb from "@/lib/prismadb";

const CategoriesPage = async ({
    params
}: {
    params:{ storeId: string }
}) => {
    const categories = await prismadb.category.findMany({
        where:{
            storeId: params.storeId,
        },
        include: {
            billboard: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedCategories: BillboardColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));
    return (
			<div className="flex-col">
				<div className="flex-1 space-y-4 p-8 pt-6">
					<BillboardClient data={formattedCategories} />
				</div>
			</div>
		);
};

export default CategoriesPage;