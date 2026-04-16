'use client';

import { Leaf, Flame, Search, X } from 'lucide-react';

interface MenuFilterSidebarProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  filterVege: boolean;
  onVegeChange: (v: boolean) => void;
  filterSpicy: boolean;
  onSpicyChange: (v: boolean) => void;
  totalResults: number;
}

export default function MenuFilterSidebar({
  searchQuery,
  onSearchChange,
  filterVege,
  onVegeChange,
  filterSpicy,
  onSpicyChange,
  totalResults,
}: MenuFilterSidebarProps) {
  const hasActiveFilters = searchQuery.length > 0 || filterVege || filterSpicy;

  const clearAll = () => {
    onSearchChange('');
    onVegeChange(false);
    onSpicyChange(false);
  };

  return (
    <aside className="hidden lg:flex flex-col gap-4 w-[220px] xl:w-[240px] shrink-0">
      <div className="sticky top-[220px] flex flex-col gap-3">

        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332]/50">
            Filtruj
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-[10px] font-semibold text-[#E8967A] hover:text-[#d07060] transition-colors"
            >
              <X className="h-3 w-3" />
              Wyczyść
            </button>
          )}
        </div>

        {/* Search by name */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1B4332]/40 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Szukaj dania…"
            className="w-full rounded-xl bg-white border border-[#1B4332]/15 py-2.5 pl-9 pr-8 text-sm text-[#1B4332] placeholder:text-[#1B4332]/35 focus:outline-none focus:border-[#1B4332]/40 focus:ring-1 focus:ring-[#1B4332]/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#1B4332]/30 hover:text-[#1B4332]/60 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Dietary toggles */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/40 mt-1">
            Rodzaj
          </span>

          {/* Vege toggle */}
          <button
            onClick={() => onVegeChange(!filterVege)}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 border transition-all text-left ${
              filterVege
                ? 'bg-green-50 border-green-300 shadow-sm'
                : 'bg-white border-[#1B4332]/12 hover:border-[#1B4332]/30'
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                filterVege ? 'bg-green-500 text-white' : 'bg-green-50 text-green-600'
              }`}
            >
              <Leaf className="h-3.5 w-3.5" />
            </span>
            <div className="flex flex-col">
              <span className={`text-[13px] font-bold leading-tight ${filterVege ? 'text-green-800' : 'text-[#1B4332]'}`}>
                Wegetariańskie
              </span>
              <span className="text-[10px] text-[#1B4332]/40 font-medium">bez mięsa</span>
            </div>
            {/* Indicator dot */}
            <span
              className={`ml-auto h-2 w-2 rounded-full transition-all ${
                filterVege ? 'bg-green-500' : 'bg-[#1B4332]/10'
              }`}
            />
          </button>

          {/* Spicy toggle */}
          <button
            onClick={() => onSpicyChange(!filterSpicy)}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 border transition-all text-left ${
              filterSpicy
                ? 'bg-orange-50 border-orange-300 shadow-sm'
                : 'bg-white border-[#1B4332]/12 hover:border-[#1B4332]/30'
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                filterSpicy ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500'
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
            </span>
            <div className="flex flex-col">
              <span className={`text-[13px] font-bold leading-tight ${filterSpicy ? 'text-orange-800' : 'text-[#1B4332]'}`}>
                Ostre
              </span>
              <span className="text-[10px] text-[#1B4332]/40 font-medium">dla odważnych</span>
            </div>
            <span
              className={`ml-auto h-2 w-2 rounded-full transition-all ${
                filterSpicy ? 'bg-orange-500' : 'bg-[#1B4332]/10'
              }`}
            />
          </button>
        </div>

        {/* Results count */}
        {hasActiveFilters && (
          <p className="text-[11px] text-[#1B4332]/50 font-medium text-center pt-1">
            {totalResults === 0 ? 'Brak wyników' : `${totalResults} ${totalResults === 1 ? 'danie' : totalResults < 5 ? 'dania' : 'dań'}`}
          </p>
        )}
      </div>
    </aside>
  );
}
