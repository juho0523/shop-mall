import { useNavigate, useParams } from "react-router-dom"
import api from '../api/api'
import { useState, useEffect } from "react"
// import products from "../data/products"

const ProductInfo = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`)
                console.log('전체 응답:', response)
                console.log('응답 데이터:', response.data)
                setProduct(response.data)
            } catch (error) {
                console.error('상품 목록 조회 에러 : ', error)
            }
        }
        fetchProduct()
    }, [id])



    return (
        <section className="product-info">
            <h2>상품 정보</h2>

            {product ? (
                <div className="product-details">
                    <p>상품 ID: {id}</p>
                    <p>상품 이름: {product.product_name}</p>
                    <p>상품 가격: {product.price}</p>
                </div>
            ) : (
                <p>상품 정보를 불러오는 중입니다.</p>
            )}

            <div className="btn-list">
                <button onClick={() => navigate('/products')}>
                    목록
                </button>
            </div>
        </section>
    )
}

export default ProductInfo