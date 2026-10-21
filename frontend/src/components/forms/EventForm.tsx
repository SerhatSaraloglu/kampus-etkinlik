import { events } from "../../data/events";

interface EventFormProps {
  onSubmit: () => void;
}

const categories = [...new Set(events.map((e) => e.category))];

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form
        className="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <p>
          <label htmlFor="ad">Etkinlik adı</label>
          <input type="text" id="ad" name="ad" maxLength={80} />
        </p>
        <p>
          <label htmlFor="kategori">Kategori</label>
          <select id="kategori" name="kategori">
            <option value="">Seçiniz</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label htmlFor="tarih">Tarih</label>
          <input type="date" id="tarih" name="tarih" />
        </p>
        <p>
          <label htmlFor="saat">Saat</label>
          <input type="time" id="saat" name="saat" />
        </p>
        <p>
          <label htmlFor="yer">Yer</label>
          <input type="text" id="yer" name="yer" />
        </p>
        <p>
          <label htmlFor="kontenjan">Kontenjan (isteğe bağlı)</label>
          <input type="number" id="kontenjan" name="kontenjan" min={1} />
        </p>
        <p>
          <label htmlFor="aciklama">Açıklama</label>
          <textarea id="aciklama" name="aciklama" rows={5} />
        </p>
        <p>
          <button type="submit">Kaydet</button>
        </p>
      </form>
    </>
  );
}

export default EventForm;
