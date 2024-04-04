import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from "../components/Products/ProductDetails"
import { useParams } from 'react-router-dom'
import { productData } from '../static/data'
import SuggestedProduct from "../components/Products/SuggestedProduct"
import { useSelector } from 'react-redux'

const ProductDetailsPage = () => {

  const {allProducts} = useSelector((state) => state.products);
    const {name} = useParams();
    const [data,setData] = useState(null);
    const productName = name.replace(/-/g," ");


    useEffect(() => {
      if (allProducts) {
          const product = allProducts.find((item) => item.name === productName);
          setData(product);
      }
  }, [allProducts, productName]);
  

  return (
    <div>
        <Header/>
        <ProductDetails data={data}/>
        {
          data && <SuggestedProduct data = {data}/>
        }
        <Footer/> 
    </div>
  )
}

export default ProductDetailsPage