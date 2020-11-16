import React from 'react'
import LoadingPage from './LoadingPage'
import ProductListItem from './ProductListItem'

export default class ProdutctList extends React.Component{
    constructor(){
        super()
        this.state = {
            products: []
        }
    }

    componentDidMount(){
        fetch('api/products')
            .then(res => res.json())
            .then(products => this.setState({ products }))
            .catch(err => console.log('error: ' + err ))
    }

    render(){
        return(
            <div className="content-container">
                <div className="list-header">
                    <h1>Dados dos Produtos:</h1>
                </div>
                {this.state.products.length !== 0 ? this.state.products.map(product =>( 
                    <ProductListItem key={product.id} product={product}/>
                )) : <LoadingPage /> }
            </div>
        )
    }
}