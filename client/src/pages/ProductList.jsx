// import products from "../data/products"
import api from '../api/api'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ProductList = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await api.get('/products')
                console.log('전체 응답:', response)
                console.log('응답 데이터:', response.data)
                setProducts(response.data)
            } catch(error) {
                console.error('상품 목록 조회 에러 : ', error)
            }
        }
        fetchProducts()
    }, [])


    return (
        <div>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                                <Link to={`/products/${product.id}`}>{product.product_name}</Link>
                            </td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="btn-add">
                <Link to="/add-product">
                    <button type="button">상품 등록</button>
                </Link>
            </div>
        </div>
    )
}
export default ProductList