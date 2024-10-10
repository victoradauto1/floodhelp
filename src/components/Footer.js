export default function Header() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center border-top p-3 m-5">
      <p className="col-4 mb-0 text-body-secondary">
        &copy; 2024 FloodHelp, Inc.
      </p>
      <ul className="nav col-4 justify-content-end">
        <li className="nav-item">
          <a href="/" className="nav-link px-2 text-body-secondary">
            Ajudar
          </a>
        </li>
        <li className="nav-item">
          <a href="/create" className="nav-link px-2 text-body-secondary">
            Pedir ajuda
          </a>
        </li>
      </ul>
    </footer>
  );
}
