import React from 'react'
import PropTypes from 'prop-types'
import classes from './DataTable.module.css'

const DataTable = ({
    data
}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Industry</th>
                    <th className={classes.numberCol}>Last Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(row => (
                        <tr>
                            <td>{row.name}</td>
                            <td>{row.symbol}</td>
                            <td>{row.industry}</td>
                            <td className={classes.numberCol}>{row.lastPrice}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

DataTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        symbol: PropTypes.string,
        industry: PropTypes.string,
        lastPrice: PropTypes.number
    }))
}

export default DataTable;