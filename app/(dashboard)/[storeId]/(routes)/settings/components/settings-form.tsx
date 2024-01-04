"use client"

import { Store } from "@prisma/client"
import * as z from "zod"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface SettingsFormProps {
    initialData : Store
}

const formSchema = z.object({
    name: z.string().min(1)
})

export const SettingsForm: React.FC<SettingsFormProps> = () => {
    return (
			<>
				<div className="flex items-center justify-between">
					<Heading title="Settings" description="Manage store preferences" />
					<Button variant="destructive" size="sm" onClick={() => {}}>
						Delete Store
						<Trash className="ml-1 h-4 w-4" />
					</Button>
				</div>
                <Separator />
			</>
		);
}