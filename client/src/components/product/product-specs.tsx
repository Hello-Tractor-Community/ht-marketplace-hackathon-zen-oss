import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { DEF_SPECS } from '@/app/(home)/tractor/page'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'

interface ProductSpecificationsProps {
	sections: typeof DEF_SPECS
}

export function ProductSpecifications({
	sections
}: ProductSpecificationsProps) {
	const [expandedSections, setExpandedSections] = useState<
		Record<string, boolean>
	>({
		'Mahindra 275 DI HT TU SP Plus Engine': true
	})

	const toggleSection = (title: string) => {
		setExpandedSections((prev) => ({
			...prev,
			[title]: !prev[title]
		}))
	}

	return (
		<div className='rounded-lg border border-gray-200 bg-white'>
			<Accordion type='single' collapsible>
				{sections.map((section, index) => {
					return (
						<AccordionItem
							key={'specs' + index}
							value={'specs' + index}
						>
							<AccordionTrigger className='p-4 text-base hover:bg-slate-50'>
								{section.title}
							</AccordionTrigger>
							<AccordionContent>
								{section.title && (
									<div className='px-6 pb-4'>
										<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
											{Object.entries(section.specs).map(
												([key, value]) => (
													<div
														key={key}
														className='flex justify-between border-b border-gray-100 py-2 last:border-b-0'
													>
														<span className='text-gray-600'>
															{key}
														</span>
														<span className='font-medium text-gray-900'>
															{value}
														</span>
													</div>
												)
											)}
										</div>
									</div>
								)}
							</AccordionContent>
						</AccordionItem>
					)
				})}
			</Accordion>
		</div>
	)
}
