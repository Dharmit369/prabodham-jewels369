import { useState, ChangeEvent } from 'react';

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    onSearch(v);
  };

  return (
    <div className="flex items-center gap-2" role="search">
      <label htmlFor="search-input" className="sr-only">Search products</label>
      <input
        id="search-input"
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={handleChange}
        className="flex-1 p-2 rounded border border-[#e8d9bf] focus:outline-none focus:ring-2 focus:ring-primary-maroon"
        aria-label="Search products"
      />
    </div>
  );
}
