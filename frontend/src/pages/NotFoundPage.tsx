import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="hata-kutusu" role="alert">
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <Link to="/">Ana sayfaya dön</Link>
    </div>
  );
}

export default NotFoundPage;
