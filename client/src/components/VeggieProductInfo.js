import React from 'react'

const VeggieProductInfo = ({ info }) => (
    <div className="list-item list-item__data" key={info.infoId}>
        <h4>Praça: {info.praca}</h4>
        <p>Preço: R${info.price}</p>
    </div>
)

export { VeggieProductInfo as default }