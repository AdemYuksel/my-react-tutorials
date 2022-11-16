import React from 'react';
import "./Table.css"


function Table({ head, subhead, body, headColumn }) {
    return (
        <table>
            <thead>
                <tr>
                    {head.map((h, key) => (
                        <th colSpan={headColumn.map((h) => (h))} key={key}>{h}</th>
                    ))}
                </tr>
                <tr>
                    {subhead.map((h, key) => (
                        <th key={key}>{h}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {body.map((items, key) => (
                    <tr key={key}>
                        {items.map((items, key) => (
                            <td key={key}>{items}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;