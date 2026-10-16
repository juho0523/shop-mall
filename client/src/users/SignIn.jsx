import { useState, useEffect } from 'react'
// import users from '../data/users';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignIn = ({onLogin}) => {

    const users = [
    { username: "user1", password: "user1111" },
    { username: "user2", password: "user2222" },
    { username: "admin", password: "admin0000" },
];
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });



    const [result, setResult] = useState(null);
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
        setResult(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { username, password } = formData;

        const matched = users.find((user) =>
            user.username === username && user.password === password
        );

        if (matched) {
            setResult("success");
            console.log("onLogin도입")
            onLogin(username);
            console.log("onLogin완료")            
            navigate('/');
        } else {
            setResult("fail");
        }

    }


    useEffect(() => {
        if (result === '') return;

        setVisible(true);

        const fadeTimer = setTimeout(() => {
            setVisible(false);
        }, 1500);

        const removeTimer = setTimeout(() => {
            setResult('');
        }, 2500);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, [result]);


    return (
        <div className="sign-in">
            <h3>로그인</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="아이디를 입력하세요"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>
                    <div>
                        <button type="submit">로그인</button>
                    </div>
                </div>
            </form>
            {/* {result === "success" && (
                <p className={visible ? "message" : "message fade-out"}>
                    환영합니다
                </p>
            )} */}
            <p className='signup-link'>
                아직 계정이 없으신가요<Link to='/signup'>회원가입</Link>
            </p>

            {result === "fail" && (
                <p className={visible ? "message" : "message fade-out"}>
                    아이디 또는 비밀번호가 일치하지 않습니다
                </p>
            )}
        </div>
    )
}
export default SignIn