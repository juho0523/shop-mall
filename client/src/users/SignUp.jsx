import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
const SignUp = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        job: '회사원',
        gender: 'male',
        memo: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if(!formData.name.trim() || !formData.job.trim() || 
            !formData.gender.trim() || !formData.memo.trim()) {
                alert('모든 필드 입력바랍니다')
                return
        }

        alert('회원가입 완료')
        navigate('/signin')
    }

    const handleInputChange = (e) => {
        const { name, value  } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleCancel = () => {
        setFormData({
            name: '',
            job: '회사원',
            gender: 'male',
            memo: '',
        })
    }

    return(
    <div className="sign-up">
      <h2>회원 가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>직업</label>
          <select
            name="job"
            value={formData.job}
            onChange={handleInputChange}
          >
            <option value="employee">회사원</option>
            <option value="student">학생</option>
            <option value="freelancer">프리랜서</option>
          </select>
        </div>
        <div>
          <label className="gender-title">성별</label>
          <div className="gender-options">
            <label><input 
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleInputChange}
            />남자</label>
            <label><input 
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleInputChange}
            />여자</label>
          </div>
        </div>
        <div>
          <label>자기소개</label>
          <textarea 
            name="memo" 
            rows={5}
            column={10}
            value={formData.memo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">가입</button>
          <button type="button" onClick={handleCancel}>취소</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp