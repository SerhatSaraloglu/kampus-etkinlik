import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { isEmail } from "../utils/validate-event";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = isEmail(email) ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <>
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      {sent && <p className="mesaj basari">Bağlantı {email} adresine gönderildi (demo).</p>}
      <form className="form" noValidate onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">E-posta</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined} />
          <span className="hata">{error}</span>
        </p>
        <p>
          <button type="submit">Bağlantı gönder</button>
        </p>
      </form>
      <p className="form-baglantilar">
        <Link to="/login">← Girişe dön</Link>
      </p>
    </>
  );
}

export default ForgotPasswordPage;
