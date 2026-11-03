import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { isEmail } from "../utils/validate-event";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [valid, setValid] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: RegisterErrors = {};
    if (name.trim().length < 3) found.name = "Ad soyad en az 3 karakter olmalı.";
    if (!isEmail(email)) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (password2 !== password) found.password2 = "Şifreler aynı değil.";
    setErrors(found);
    setValid(Object.keys(found).length === 0);
  }

  return (
    <>
      {valid && <p className="mesaj basari">Form geçerli. Gerçek kayıt Sprint 10'da eklenecek.</p>}
      <form className="form" noValidate onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Ad Soyad</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined} />
          <span className="hata">{errors.name}</span>
        </p>
        <p>
          <label htmlFor="email">E-posta</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined} />
          <span className="hata">{errors.email}</span>
        </p>
        <p>
          <label htmlFor="password">Şifre</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined} />
          <span className="hata">{errors.password}</span>
        </p>
        <p>
          <label htmlFor="password2">Şifre (tekrar)</label>
          <input type="password" id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)}
            aria-invalid={errors.password2 ? true : undefined} />
          <span className="hata">{errors.password2}</span>
        </p>
        <p>
          <button type="submit">Kayıt ol</button>
        </p>
      </form>
      <p className="form-baglantilar">
        <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
      </p>
    </>
  );
}

export default RegisterPage;
