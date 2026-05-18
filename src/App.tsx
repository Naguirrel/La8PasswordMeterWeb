import { PasswordMeter } from './components/PasswordMeter';

export function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">La8 Password Meter</p>
        <h1>Mide la fuerza de tu password en segundos.</h1>
        <PasswordMeter />
      </section>
    </main>
  );
}
