import { useState, useRef, useEffect, FormEvent } from "react";
import useSWR from "swr";
import { AiOutlineSearch } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import TableComponent from "../Table";
import { DNA } from "../Loader";
import "./styles.scss";
import useOnClickOutside from '../../config/hooks/useOnClickOutside';
import useDebounce from '../../config/hooks/useDebounce';
import Button from '../Button';

const SearchBox = () => {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  const debouncedName = useDebounce(name, 3000);
 const predefinedSuggestions = ['BRCA1', 'TP53', 'EGFR', 'KRAS', 'ALK', 'PTEN', 'FLT3', 'MYC', 'MAP2K1', 'NOTCH1'];

 const filteredSuggestions = predefinedSuggestions.filter(suggestion =>
   suggestion.toLowerCase().includes(name.toLowerCase())
 );
  
  const {
    data: tableData,
    error: tableDataError,
    isLoading: tableDataLoading,
  } = useSWR(
    `https://660196a287c91a11641b3398.mockapi.io/api/gnome/sukl/genomes?name=${query}`
  );

  useOnClickOutside(suggestionsRef, () => setShowSuggestions(false));

  // Update query when debouncedName changes
  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName]);

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(name)
    setShowSuggestions(false); 
  };

  const handleSuggestionClick = (genomeName:string) => {
    setName(genomeName);
    setShowSuggestions(false); 
  };

  const columns = [
    { title: "Názov", key: "name" },
    { title: "Úplný názov", key: "fullName" },
    { title: "Genotyp", key: "geneType" },
    { title: "Tiež známy ako", key: "alsoKnownAs" },
  ];

  return (
    <>
      <form className="searchbox-container" onSubmit={handleSubmit}>
        <div className="searchWrapper">
          <div className="searchBoxWrapper">
            <input
              type="search"
              list="genomeList"
              id="genomeSearch"
              name="genomeSearch"
              placeholder='Zadajte názov génu'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setShowSuggestions(true); 
              }}
            />
            {showSuggestions && (
              <ul className="suggestionstList" ref={suggestionsRef}>
                {filteredSuggestions?.map((genome:string) => (
                  <li
                    key={genome}
                    onClick={() => handleSuggestionClick(genome)}
                  >
                    {genome}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button type="submit" variant="primary" icon={<AiOutlineSearch />}>
            Search
          </Button>
          <Button
            variant="secondary"
            type="reset"
            icon={<GrPowerReset color="#fff" title="reset" size="1rem" />}
            onClick={() => {
              setName("");
              setQuery("");
            }}
          >
            Reset
          </Button>
          <DNA
            visible={tableDataLoading}
            height="40"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      </form>
      
      <TableComponent data={tableData} columns={columns} noDataFallback={"Neboli nájdené žiadne záznamy"} error={ tableDataError} />
    </>
  );
};

export default SearchBox;
