import React from "react";

const SearchInput = ({ value, onSearchChange }) => {
    return (
        <>
         <div className="relative">
            <div className="fixed top-1 left-3 right-3 z-20">
                <input id="search" name="search" value={value} onChange={onSearchChange} type="search" placeholder="Buscar" className="input input-bordered input-accent w-full relative pl-12" />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" style={{ color: 'gray' }}>
                    <path style={{ fill: 'currentcolor' }} d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
            </div>
        </div>
        </>
    )
};

export default SearchInput;
