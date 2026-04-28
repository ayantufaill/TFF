import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "./ui/utils"
import { Button } from "./ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import { countries, Country } from "../data/countries"

import { ScrollArea } from "./ui/scroll-area";

interface CountryPickerProps {
  value: string;
  onChange: (value: string) => void;
  mode: 'dial' | 'name';
  placeholder?: string;
  className?: string;
  id?: string;
}

export function CountryPicker({ value, onChange, mode, placeholder, className, id }: CountryPickerProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const selectedCountry = countries.find((c) => 
    mode === 'dial' ? c.dial_code === value : c.name === value
  )

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dial_code.includes(searchQuery) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          className={cn(
            "flex w-full items-center justify-between h-12 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm transition-all hover:bg-gray-50 hover:border-[#C9A961]/50 focus:outline-none focus:ring-4 focus:ring-[#C9A961]/10 focus:border-[#C9A961] shadow-sm",
            className
          )}
        >
          <div className="flex items-center gap-2.5 truncate">
            {selectedCountry ? (
              <>
                <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-100 flex-shrink-0 shadow-sm">
                  <img 
                    src={`https://flagcdn.com/w80/${selectedCountry.code.toLowerCase()}.png`} 
                    alt={selectedCountry.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="truncate font-bold text-gray-800">
                  {mode === 'dial' ? selectedCountry.dial_code : selectedCountry.name}
                </span>
              </>
            ) : (
              <span className="text-gray-400 font-medium">{placeholder || "Select..."}</span>
            )}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0 z-[9999] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-gray-100 bg-white rounded-2xl overflow-hidden !w-[var(--radix-popover-trigger-width)]"
        align="start"
        sideOffset={8}
      >
        <div className="flex flex-col h-full max-h-[400px]">
          {/* Search Header */}
          <div className="px-3 py-2.5 border-b border-gray-50 sticky top-0 bg-white z-10">
            <div className="relative group">
              <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 h-8 bg-gray-50/80 border border-transparent rounded-lg text-[10px] focus:ring-2 focus:ring-[#C9A961]/10 focus:border-[#C9A961]/30 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          {/* Scrollable List */}
          <div 
            className="overflow-y-auto overflow-x-hidden p-1 custom-scrollbar"
            style={{ maxHeight: '250px' }}
          >
            {filteredCountries.length === 0 ? (
              <div className="py-8 text-center text-[10px] text-gray-400 font-medium">
                No results
              </div >
            ) : (
              <div className="space-y-0.5">
                {filteredCountries.map((country) => {
                  const isSelected = (mode === 'dial' ? country.dial_code : country.name) === value;
                  return (
                    <button
                      key={country.code}
                      onClick={() => {
                        onChange(mode === 'dial' ? country.dial_code : country.name)
                        setOpen(false)
                        setSearchQuery("")
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 py-1.5 px-2 rounded-lg transition-all text-left group",
                        isSelected ? "bg-[#2C5F2D]/5" : "hover:bg-gray-50"
                      )}
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-100 flex-shrink-0 shadow-sm">
                        <img 
                          src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`} 
                          alt={country.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <span className={cn(
                          "text-[11px] truncate",
                          isSelected ? "font-extrabold text-[#2C5F2D]" : "font-bold text-gray-700"
                        )}>
                          {mode === 'dial' ? country.dial_code : country.name}
                        </span>
                        {mode === 'name' && (
                           <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest opacity-60">
                            {country.code}
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="h-3 w-3 text-[#2C5F2D] flex-shrink-0" strokeWidth={3} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #f1f1f1;
            border-radius: 10px;
          }
        `}</style>
      </PopoverContent>
    </Popover>
  )
}
