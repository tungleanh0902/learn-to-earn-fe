import React, { useMemo } from 'react'
import { SentencePart } from './SentencePart'
import { SortableContext } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from "@dnd-kit/utilities";

export const SenteceRow = ({row, parts}) => {

    const partIds = parts.map(({id}) => id);
    const {setNodeRef, attributes,listeners,transform,transition,isDragging} = useSortable({
        id: row.id,
        data: {
            type: "Row",
            row,
        },
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

  return (
    <div className='bg-columnBG w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col'>
        <header className=' bg-mainBG text-base h-[60px] rounded-md rounded-b-none p-3 font-bold border-columnBG border-4'>
            {row.title}
        </header>

        <main 
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className='flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto'>
            {/* In the sortable context need to pass items which are ids of all your array elements */}
            <SortableContext items={partIds}>
            {parts.map(part=>(
                <SentencePart key={part.id} part={part}/>
            ))}
            </SortableContext>
        </main>
    </div>
  )
}
