import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { isEmail } from "../utils/validate-event";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [valid, setValid] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: typeof errors = {};
    if (!isEmail(email)) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    setValid(Object.keys(found).length === 0);
  }

  return (
    <>
      {valid && <p className="mesaj basari">Form geçerli. Gerçek giriş Sprint 10'da eklenecek.</p>}
      <form className="form" noValidate onSubmit={handleSubmit}>
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
          <button type="submit">Giriş yap</button>
        </p>
      </form>
      <p className="form-baglantilar">
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </p>
    </>
  );
}

export default LoginPage;
