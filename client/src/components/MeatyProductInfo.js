import React from 'react'

const MeatyProductInfo = ({ info }) => (
    <div className="list-item list-item__data" key={info.infoId}>
        <h4>Praça: {info.praca}</h4>
        <p>Preço: R${info.price}</p>
        <p>30 Dias: R${info.thirtyDays}</p>
        <p>Base: R${info.base}</p>
    </div>
)
export  { MeatyProductInfo as default }