import React from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'
import { DEF_SPECS } from '@/constants/tractors'

interface ProductSpecificationsProps {
	sections: typeof DEF_SPECS
}

export function ProductSpecifications({
	sections
}: ProductSpecificationsProps) {

	return (
		<div className='bg-white border border-gray-200'>
			<Accordion type='single' collapsible>
				{sections.map((section, index) => {
					return (
						<AccordionItem
							key={'specs' + index}
							value={'specs' + index}
						>
							<AccordionTrigger className='text-lg p-6'>
								{section.title}
							</AccordionTrigger>
							<AccordionContent className='bg-white'>
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
