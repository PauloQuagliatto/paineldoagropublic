import React from 'react'
import VeggieProductInfo from './VeggieProductInfo'
import MeatyProductInfo from './MeatyProductInfo'

const ProductItemList = ({ product }) => (
    <div className="list-body" >
        <h2 className="list-item list-item__title">{product.name}:</h2>
        {product.isVeggie ? product.information.map(info =>
            <VeggieProductInfo key={info.infoId} info={info} />
        ) : product.information.map(info => 
           <MeatyProductInfo key={info.infoId} info={info}/>
        )}
    </div>
)

export { ProductItemList as default }