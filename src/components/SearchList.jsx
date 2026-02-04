import React, { useState, useMemo } from 'react';

const SearchList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const names = useMemo(
    () => [
      'Alice Johnson',
      'Bob Smith',
      'Charlie Brown',
      'David Williams',
      'Emma Davis',
      'Frank Miller',
      'Grace Wilson',
      'Henry Taylor',
      'Isabella Martinez',
      'Jack Anderson',
      'Katherine Thomas',
      'Liam Jackson',
      'Mia White',
      'Noah Harris',
      'Olivia Martin',
      'Peter Thompson',
      'Quinn Garcia',
      'Rachel Martinez',
      'Samuel Robinson',
      'Taylor Clark',
      'Ursula Rodriguez',
      'Victor Lewis',
      'Wendy Lee',
      'Xander Walker',
      'Yvonne Hall',
      'Zachary Allen'
    ],
    []
  );

  const highlightText = (text, query) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="search-highlight">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const filteredNames = useMemo(() => {
    if (!searchQuery.trim()) return names;
    const q = searchQuery.toLowerCase();
    return names.filter((name) => name.toLowerCase().includes(q));
  }, [names, searchQuery]);

  const totalMatches = useMemo(() => {
    if (!searchQuery.trim()) return 0;
    const q = searchQuery.toLowerCase();
    return filteredNames.reduce((sum, name) => {
      const matches = name.toLowerCase().match(new RegExp(q, 'g'));
      return sum + (matches ? matches.length : 0);
    }, 0);
  }, [filteredNames, searchQuery]);

  return (
    <div className="search-wrapper">
      <h2 className="search-title">Live Search (Names)</h2>

      <input
        type="text"
        className="search-input-simple"
        placeholder="Search names..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <p className="search-info">
        {searchQuery.trim()
          ? `Matching names: ${filteredNames.length} | Total occurrences: ${totalMatches}`
          : 'Type above to start searching.'}
      </p>

      <div className="search-results">
        {searchQuery.trim() && filteredNames.length === 0 ? (
          <p className="search-no-matches">No matches found.</p>
        ) : (
          <ul className="search-results-list">
            {filteredNames.map((name) => (
              <li key={name} className="search-results-item">
                {highlightText(name, searchQuery)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchList;
