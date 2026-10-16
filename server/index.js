import mysql2 from 'mysql2'
import express from 'express'
import cors from 'cors'
const app = express();
const PORT = 8000;


// 브라우저가 보안상 이유로 api 요청을 차단하는데 api 요청 차단을 방지하기 위한 라이브러리임
app.use(cors({
    origin: "http://localhost:5173"
}))

// JsUser_2026! <-mysql 비밀번호
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'jsuser',
    password: 'JsUser_2026!',
    database: 'jsdb'
})

db.connect((err) => {
    if(err) {
        console.log('Error connecting to MySQL: ', err)
        return;
    }
    console.log('MySQL 연결됨')
})

app.use(express.json())

app.get("/api/products", (req, res) => {
    
    const sql = 'SELECT * FROM product'
    db.query(sql, (err, results) =>{
        if(err){
            console.log("상품 조회 에러", err)
            res.status(500).send("상품 조회 중 오류가 발생했습니다")
            return
        }
        res.json(results)
    })
})

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id
    const sql = 'SELECT * FROM product WHERE id = ?'
    db.query(sql, [productId], (err, results) =>{
        if(err){
            console.log("상품 조회 에러", err)
            res.status(500).send("상품 조회 중 오류가 발생했습니다")
            return
        }
        res.json(results[0])
    })
})

app.delete('/api/product/:id', (req, res) => {
    const productId = req.params.id;
    const sql = "delete from product where id = ?"
    db.query(sql, [productId], (err, results) => {
        if(err){
            console.error("상품 삭제 에러 : ", err)
            res.status(500).send("상품 삭제 중 오류가 발생했습니다")
            return
        }
        res.send("상품이 성공적으로 삭제되었습니다")
    })
})


app.put("/api/products/:id", (req, res) => {
    const productId = req.params.id
    const {productName, price} = req.body
    const sql = "update product set product_name = ?, price = ? where id = ?"
    db.query(sql, [productName, price, productId], (err, results) => {
        if(err){
            console.error("상품 수정 에러 : ", err)
            res.status(501).send("상품 수정 중 오류가 발생했습니다")
            return
        }
        res.send("상품이 성공적으로 수정되었습니다")
    })
})

app.post("/api/products", (req, res) => {
    const {productName, price} = req.body
    const sql = 'INSERT INTO product(product_name, price) VALUES (?, ?)'
    db.query(sql, [productName, price], (err, results) => {
        if(err){
            console.error("상품 등록 에러", err)
            res.status(500).send("상품 등록 중 오류가 발생했습니다")
            return;
        }
        res.status(201).send("상품이 성공적으로 등록되었습니다")
    })
})

app.get('/', (req, res) => {
    res.send("<h1>서버 DB 연동</h1>")
})



app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})