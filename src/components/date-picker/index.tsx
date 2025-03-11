import { Calendar as CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import Button from '../button'
import { Calendar } from '../calendar'
import { DateTime } from 'luxon'
import { useState } from 'react'

interface Props {
  value: Date
  onChange: (value: Date) => void
}

function DatePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setOpen(!open)}
          className={`w-[280px] justify-start text-left font-normal ${
            !value && 'text-muted-foreground'
          }`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            DateTime.fromJSDate(value).toFormat('dd / MM / yyyy')
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(v) => {
            if (v) {
              onChange(v)
            }
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
