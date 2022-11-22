import React, { useState } from 'react';
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa"
import "./Table.css"

function Table({ head, subhead, body, searchable }) {
    const [search, setSearch] = useState('');
    const [sorting, setSorting] = useState(false)
    const filteredData = body.filter(
        item => (item?.key || item?.props?.searchableText || item).toString().toLocaleLowerCase('TR').includes(search.toLocaleLowerCase('TR')
        )
    ).sort((a, b) => {
        if (sorting?.orderBy === 'asc') {
            return (a[sorting.key]?.key || a[sorting.key]?.props?.searchableText || a[sorting.key]).toString().localeCompare(b[sorting.key]?.key || b[sorting.key]?.props?.searchableText || b[sorting.key])
        }
        if (sorting?.orderBy === 'desc') {
            return b[sorting.key].toString().localeCompare(a[sorting.key])
        }
    })

    if (!body || body?.length === 0) {
        return (
            <div className="">Sorry, no data found.</div>
        )
    }

    return (
        <>
            {searchable && (
                <form action="" className="search-bar">
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        type="search"
                        name="search"
                        placeholder="Search in table"
                        pattern=".*\S.*" required />
                    <button className="search-btn" type="submit">
                        <span>Search</span>
                    </button>
                    {sorting && (
                        <button
                            onClick={() => setSorting(false)}
                            className="sorting-btn">
                            Cancel Sort
                        </button>
                    )}
                </form>
            )}
            <table>
                <thead>
                    <tr>
                        {head.map((h, key) => (
                            <th colSpan={h?.colSpan}
                                rowSpan={h?.rowSpan}
                                key={key}
                            >
                                {h?.name}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {subhead.map((h, key) => (
                            <th
                                key={key}
                            >{h.name}
                                {h.sortable && (
                                    <button className="sort-button" onClick={() => {
                                        if (sorting?.key === key) {
                                            setSorting({
                                                key,
                                                orderBy: sorting.orderBy === 'asc' ? 'desc' : 'asc'
                                            })
                                        } else {
                                            setSorting({
                                                key,
                                                orderBy: 'asc'
                                            })
                                        }
                                    }}>
                                        {sorting?.key === key && (
                                            sorting.orderBy === 'asc' ? <FaSortDown size={14} /> : <FaSortUp size={14} />
                                        )}
                                        {sorting?.key !== key && <FaSort size={14} />}
                                    </button>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((items, key) => (
                        <tr key={key}>
                            {items.map((item, key) => (
                                <td key={key}>
                                    {Array.isArray(item) ? (
                                        <div className="">
                                            {item}
                                        </div>
                                    ) : item}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Table;