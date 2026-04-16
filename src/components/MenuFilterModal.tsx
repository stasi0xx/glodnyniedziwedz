'use client';

import { useEffect, useState, useCallback } from 'react';
import { Leaf, Flame, Search, X, SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CategoryIcon from './CategoryIcon';

interface MenuFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  filterVege: boolean;
  onVegeChange: (v: boolean) => void;
  filterSpicy: boolean;
  onSpicyChange: (v: boolean) => void;
  filterCategory: string;
  onCategoryChange: (v: string) => void;
  categories: string[];
  totalResults: number;
}

export default function MenuFilterModal({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  filterVege,
  onVegeChange,
  filterSpicy,
  onSpicyChange,
  filterCategory,
  onCategoryChange,
  categories,
  totalResults,
}: MenuFilterModalProps) {
  const tCat = useTranslations('categories');
  const [isClosing, setIsClosing] = useState(false);
  const hasActiveFilters = searchQuery.length > 0 || filterVege || filterSpicy || !!filterCategory;

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 320);
  }, [onClose]);

  const clearAll = () => {
    onSearchChange('');
    onVegeChange(false);
    onSpicyChange(false);
    onCategoryChange('');
  };

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-[60] flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Bottom sheet */}
      <div className={`relative bg-[#FDF6EC] rounded-t-3xl px-5 pt-4 pb-8 flex flex-col gap-5 shadow-2xl z-[60] ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}>
        {/* Handle bar */}
        <div className="mx-auto w-10 h-1 rounded-full bg-[#1B4332]/20" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#1B4332]" />
            <span className="font-bold text-[#1B4332] text-base">Filtruj menu</span>
          </div>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-xs font-semibold text-[#E8967A] hover:text-[#d07060] transition-colors"
              >
                Wyczyść
              </button>
            )}
            <button
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1B4332]/8 text-[#1B4332]/60 hover:bg-[#1B4332]/15 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B4332]/40 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Szukaj dania…"
            autoFocus
            className="w-full rounded-2xl bg-white border border-[#1B4332]/15 py-3 pl-10 pr-10 text-sm text-[#1B4332] placeholder:text-[#1B4332]/35 focus:outline-none focus:border-[#1B4332]/40 focus:ring-1 focus:ring-[#1B4332]/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1B4332]/30 hover:text-[#1B4332]/60 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Dietary toggles */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/40">Rodzaj</span>

          <div className="grid grid-cols-2 gap-3">
            {/* Vege */}
            <button
              onClick={() => onVegeChange(!filterVege)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 border transition-all text-left ${filterVege
                ? 'bg-green-50 border-green-300 shadow-sm'
                : 'bg-white border-[#1B4332]/12'
                }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${filterVege ? 'bg-green-500 text-white' : 'bg-green-50 text-green-600'
                  }`}
              >
                <Leaf className="h-4 w-4" />
              </span>
              <div className="flex flex-col">
                <span className={`text-[13px] font-bold leading-tight ${filterVege ? 'text-green-800' : 'text-[#1B4332]'}`}>
                  Vege
                </span>
                <span className="text-[10px] text-[#1B4332]/40 font-medium">bez mięsa</span>
              </div>
            </button>

            {/* Spicy */}
            <button
              onClick={() => onSpicyChange(!filterSpicy)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 border transition-all text-left ${filterSpicy
                ? 'bg-orange-50 border-orange-300 shadow-sm'
                : 'bg-white border-[#1B4332]/12'
                }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${filterSpicy ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500'
                  }`}
              >
                <Flame className="h-4 w-4" />
              </span>
              <div className="flex flex-col">
                <span className={`text-[13px] font-bold leading-tight ${filterSpicy ? 'text-orange-800' : 'text-[#1B4332]'}`}>
                  Ostre
                </span>
                <span className="text-[10px] text-[#1B4332]/40 font-medium">dla odważnych</span>
              </div>
            </button>
          </div>
        </div>

        {/* Category selection */}
        {categories.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/40">Kategoria</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onCategoryChange('')}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 border text-[12px] font-semibold transition-all ${
                  !filterCategory
                    ? 'bg-[#1B4332] text-white border-[#1B4332]'
                    : 'bg-white text-[#1B4332] border-[#1B4332]/20'
                }`}
              >
                Wszystkie
              </button>
              {categories.map((cat) => {
                const label = tCat(cat as Parameters<typeof tCat>[0]);
                const isSelected = filterCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => onCategoryChange(isSelected ? '' : cat)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 border text-[12px] font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#1B4332] text-white border-[#1B4332]'
                        : 'bg-white text-[#1B4332] border-[#1B4332]/20'
                    }`}
                  >
                    <CategoryIcon category={cat} className={`h-3 w-3 ${isSelected ? 'text-[#E8967A]' : 'text-[#ed8788]'}`} />
                    <span>{label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Apply button */}
        <button
          onClick={handleClose}
          className="w-full rounded-2xl bg-[#1B4332] py-3.5 text-sm font-bold text-white transition-all active:scale-[0.98]"
        >
          {hasActiveFilters
            ? `Pokaż wyniki${totalResults > 0 ? ` (${totalResults})` : ''}`
            : 'Zastosuj'}
        </button>
      </div>
    </div>
  );
}
